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