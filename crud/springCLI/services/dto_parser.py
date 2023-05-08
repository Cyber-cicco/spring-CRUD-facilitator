import os
import re
from springCLI.utils.fileUtils import *
from springCLI.datas.ts_interface_content import file_template
import springCLI.utils.java_to_ts_transformer as jts

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
        pattern = r"(private|protected)(\s+\w+|\s+\w+<.+>)+\s+(\w+)(\s?=.*)?;"
        matches = re.findall(pattern, contents)
        for match in matches:
            java_type = match[1]
            typescript_type = jts.find_ts_type(java_type, imports)
            field_name = match[2]
            typescript_body.append({"type":typescript_type, "name":field_name})
        for field in typescript_body:
            name = field["name"]
            ts_type = field["type"]
            body += f"  {name}:{ts_type},\n" 
        for imp in imports:
            imports_string += imp
        # Create the TypeScript file
        ts_file_name = class_name.lower() + ".ts"
        ts_file_path = os.path.join("models", ts_file_name)
        with open(ts_file_path, "w") as ts_file:
            ts_file.write(file_template.format(imports=imports_string, class_name=class_name, body=body, file_path=file_path))
