import os
import re

type_mapping = {
    'String': 'string',
    'int': 'number',
    'Integer': 'number',
    'long': 'number',
    'Long': 'number',
    'float': 'number',
    'double': 'number',
    'Double': 'number',
    'Float': 'number',
    'double': 'number',
    'boolean': 'boolean',
    'Boolean': 'boolean',
    'LocalDateTime' : 'Date',
    'LocalDate' : 'Date',
    'LocalTime' : 'Date',
    'MultipartFile' : 'File',
    'HttpStatus':'HttpStatusCode',
    # add more type mappings as needed
}

file_template = '''
//{file_path}
{imports}

export interface {class_name} {{

{body}
}}
'''

def find_ts_type(java_type:str, imports:list=[]):
    java_type = java_type.strip()
    if java_type in type_mapping.keys():
        return type_mapping.get(java_type, 'any')
    else:
        if java_type.endswith("Dto"):
            new_type = java_type[:-3]
            imports.append(f"import {{{new_type}}} from \"./{new_type.lower()}\";\n")
            return new_type
        elif '<' in java_type:
            next_type = java_type.split('<')[0].strip()
            if 'Map' == next_type:
                return 'Object'
            elif 'List' == next_type :
                inner_type = java_type[ java_type.index("<")+1 : -1 ].strip()
                return find_ts_type(inner_type, imports) + "[]"
            elif 'ResponseEntity' == next_type:
                inner_type = java_type[ java_type.index("<")+1 : -1 ].strip()
                return find_ts_type(inner_type, imports)
            else:
                return 'any'
        else:
            return "any"

def find_all_fields(file_path:str):
    file_name = os.path.basename(file_path)
    class_name = file_name.replace("Dto.java", "")
    body=""
    if not os.path.exists('models'):
        os.makedirs('models')
    with open(file_path, "r") as f:
        typescript_body=[]
        imports = []
        imports_string = ""
        contents = f.read()
        pattern = r"(private|protected)(\s+\w+|\s+\w+<.+>)+\s+(\w+);"
        matches = re.findall(pattern, contents)
        for match in matches:
            java_type = match[1]
            typescript_type = find_ts_type(java_type, imports)
            field_name = match[2]
            typescript_body.append({"type":typescript_type, "name":field_name})
        for field in typescript_body:
            name = field["name"]
            ts_type = field["type"]
            body += f"  {name}:{ts_type},\n" 
            print(field)
        for imp in imports:
            imports_string += imp
        # Create the TypeScript file
        ts_file_name = class_name.lower() + ".ts"
        ts_file_path = os.path.join("models", ts_file_name)
        with open(ts_file_path, "w") as ts_file:
            ts_file.write(file_template.format(imports=imports_string, class_name=class_name, body=body, file_path=file_path))



def read_files_in_directory(directory):
    for file_name in os.listdir(directory):
        file_path = os.path.join(directory, file_name)
        if os.path.isfile(file_path) and file_name.endswith("Dto.java"):
            find_all_fields(file_path)
        elif os.path.isdir(file_path):
            read_files_in_directory(file_path)

current_directory = os.getcwd()
read_files_in_directory(current_directory)


