import os
import re
from springCLI.datas.ts_service_content import template_http, template_ts_service
from springCLI.utils.FileUtils import *
import springCLI.utils.java_to_ts_transformer as jts


#Parse the java controller and creates a dictionary containing all endpoints of the controller
def read_controller_annotations(file_path):

    http_endpoints = []
    path_root = ""

    verb_pattern = r"@(Put\w+|Delete\w+|Get\w+|Post\w+|Patch\w+|RequestMapping\(\s*method\s*=\s*\w+\.\w*)"
    root_path_pattern = r'@RequestMapping\("\/.+"\)'
    rm_annotation_pattern = r'RequestMapping\(\s*method\s*=\s*\w+\.\w*'
    path_variable_pattern = verb_pattern + r'\((path\s*= )?".*\)'
    request_body_pattern = r'@RequestBody\s+\w+\s+\w+'
    request_param_pattern = r'(String|Integer|Float|LocalDateTime|int|double|Double|Long|MultipartFile)\s+\w+'
    rp_annotation_pattern = r"@RequestParam"
    return_type_pattern = r'public(\s+\w+|\s+\w+<.+>)+\s+(\w+)'

    with open(file_path, "r") as f:

        for line in f:
            if re.search(verb_pattern, line):
                
                path_variable = path_root
                return_type = ""
                request_body = []
                request_param = []

                if re.search(rm_annotation_pattern, line):
                    verb = re.findall(rm_annotation_pattern, line)[0].split('.', 1)[-1].lower()
                else:
                    verb = re.findall(verb_pattern, line, re.DOTALL)[0].replace("@", "").replace("Mapping", "").lower()


                if re.search(path_variable_pattern, line):
                    path_variable += re.findall(r'".*"', line)[0].replace('"', '')
                
                if re.search(r',\s*path\s*=\s*"\/\w+"', line):
                        path_variable += re.findall(r'"\/\w+"', line)[0].replace('"', '')

                line = next(f, None)

                while line.strip().startswith('@'):
                    line = next(f, None)

                if re.search(return_type_pattern, line):
                    java_return_type = re.findall(return_type_pattern, line)[0][0]
                    return_type = jts.find_ts_type(java_return_type)
                
                if re.search(request_body_pattern, line):
                    request_body.append(jts.find_ts_type(re.findall(request_body_pattern, line)[0].split(" ")[1]))
                    request_body.append(re.findall(request_body_pattern, line)[0].split(" ")[2])
                    if request_body[0] == 'List':
                        request_body[0] = jts.find_ts_type(re.findall(r'<\w+>', line)[0].replace("<", "").replace(">", "")) + '[]'

                if re.search(rp_annotation_pattern, line):
                    request_param.append(re.search(request_param_pattern, line)[0].split())                 
                    request_param[-1][0] = jts.find_ts_type(request_param[-1][0], ())

                while not line.strip().endswith("{"):
                    line = next(f, None)
                    if re.search(rp_annotation_pattern, line):
                        request_param.append(re.search(request_param_pattern, line)[0].split())
                        request_param[-1][0] = jts.find_ts_type(request_param[-1][0])

                http_endpoints.append({
                    "verb":verb, 
                    "path":path_variable, 
                    "request_body":request_body, 
                    "request_params":request_param,
                    "return":return_type})

            if re.search(root_path_pattern, line):
                path_root = re.findall(r'".*"', line)[0].replace('"', '')

    return http_endpoints

def generate_angular_http_query(http_endpoint, urls_set, imports_set):
    http_content = template_http

    # Initialization of the variables used to create the endpoint
    path = http_endpoint["path"]
    verb = http_endpoint["verb"]
    return_type = http_endpoint["return"]
    request_params = http_endpoint['request_params']
    request_body = http_endpoint['request_body']
    url_suffix = ''
    final_url = ''
    by = ""

    path_variable = path
    variable_url = 'URL_API' + path_variable.replace("/",'_').replace("{", "").replace("}", "").upper()
    import_type = return_type
    
    if re.search(r'\/api\/v\w', path):
        path_variable = re.sub(r'\/api\/v\w', '', path_variable)
    if return_type:
        if return_type not in ['string', 'number', 'any', 'string[]', 'number[]', 'HttpStatusCode', 'Object']:
            if '[]' in return_type:
                import_type = return_type.replace('[]', '')
            imports_set.add('\nimport {{{request_body}}} from "../models/{request_body_lower}";'.format(
                request_body=import_type,
                request_body_lower=import_type.lower()))
    
    return_type = '<'+return_type+'>' if return_type != 'any' else ''
    # Creation of the URLs for every endpoint of the service, assuming there is a environement that contains an URL for the API
    urls_set.add('private '+ variable_url + ' = environnement.urlApi + ' + '"' + http_endpoint["path"] + '"' + ';')
    #Creation of the http methods to connect to the endpoints
    method = verb
    target_name = ""
    required_args = ""
    url_changer = ""
    body = ""
    list_path_stage = path_variable.split('/')
    list_path_stage.pop(0)
    list_path_stage.pop(0)
    for path_stage in list_path_stage:
        if(path_stage != '' and not re.search(r'{(.*?)}', path_stage)):
            target_name += path_stage[0].upper() + path_stage[1:]
    
    #check if there are path variables and change the name of the method,
    #the arguments and change the url
    if "{" in path :
        url_changer = '''
    let newURL = {url}'''.format(url='this.' + variable_url)
        by = 'By'
        path_var_matches = re.findall(r'{(\w+)}', path)
        for match in path_var_matches:
            by += match[0].upper() + match[1:]
            required_args += ', ' + match + ': string'
            url_changer += '''
    newURL = newURL.replace('{{{match}}}', {match});'''.format(match=match)
    
    #check if there are request parameters, and change the arguments accordingly, plus the URL
    if request_params:
        url_suffix += '+"?"'
        for request_param in request_params:
            required_args += ', param' + (request_param[1][0].upper() + request_param[1][1:]) + ' : ' + request_param[0]
            url_suffix += '+"&{request}="+{request}'.format(request='param'+request_param[1][0].upper() + request_param[1][1:])
    
    if request_body:
        request_body_lower = request_body[1]
        required_args += ', ' + request_body_lower + ' : ' + request_body[0]
        imports_set.add('\nimport {{{request_body}}} from "../models/{request_body_lower}";'.format(
            request_body=request_body[0],
            request_body_lower=request_body[0].lower()))
        body = ',' + request_body_lower if verb != 'delete' and verb != 'get' else ',{ body : ' + request_body_lower + '  }'
    if not request_body and verb in ['put', 'post']:
        body = ',{}'
    
    if url_changer:
        final_url = 'newURL'
    else:
        final_url = 'this.' + variable_url
    
    required_args = required_args.replace(', ', '', 1)
    http_content = http_content.format(
        method=method,
        target_name=target_name,
        by=by,
        url_changer=url_changer,
        required_args=required_args,
        return_type=return_type,
        url_changed=final_url,
        request_params=url_suffix,
        body=body,
    )
    return http_content

def generate_angular_service(file_path):
    # Parse the controller file and retrieve HTTP endpoints
    http_endpoints = read_controller_annotations(file_path)
    
    template = template_ts_service
    urls_set = set()
    imports_set = set()
    service_name = os.path.basename(file_path).replace("Controller.java", ".service.ts")
    class_name = service_name.replace('.service.ts', 'Service')
    service_name = service_name.lower()
       
    # Add the common imports for all services
    imports = "import { environnement } from '../environnements/environnement';\n"
    imports += "import { Injectable } from '@angular/core';\n"
    imports += 'import { HttpClient } from "@angular/common/http";\n'
    
    urls = ""
    http = ""


    for http_endpoint in http_endpoints:
        http += generate_angular_http_query(http_endpoint, urls_set, imports_set)

    
    # Write the urls
    for url in urls_set:
        urls += '   ' + url + '\n'

    # Write the imports
    for imp in imports_set:
        imports += imp

    src_path = file_path
    src_index = file_path.find("/src/")
    if src_index != -1:
        src_path = file_path[src_index:]

    template = template.format(
        class_name=class_name,
        urls=urls,
        http=http,
        imports=imports,
        path=src_path
    )

    for url in urls_set:
        urls += 'URL_API' + url + '\n'

    if not os.path.exists('typescriptService'):
        os.makedirs('typescriptService')

    with open(f"typescriptService/{service_name}", "w") as f:
        f.write(template)

current_directory = os.getcwd()
file_reader = FileReader()
file_reader.read_files_in_directory(current_directory, 'Controller.java', generate_angular_service)
