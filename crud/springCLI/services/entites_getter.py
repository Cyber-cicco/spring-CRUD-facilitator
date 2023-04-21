import os
import importlib
from springCLI.datas.autocompletion import *

template_field = '''
{annotations}
    private {type} {nom_variable};
'''

class JavaContent:

    def __init__(self, entity_fields, entity_imports, dto_fields, dto_imports) -> None:
        self.entity_fields = entity_fields
        self.entity_imports = ''.join(entity_imports)
        self.dto_fields = dto_fields
        self.dto_imports = ''.join(dto_imports)

def find_all_entites():
    return list(map(lambda name : name[0].upper() + name.replace('.py', '')[1:], filter(lambda x: x.endswith('.py'), os.listdir('./springCLI/python_entities_template'))))

def define_content_based_on_entity(class_name, entities_name):
    entity_fields = ''
    dto_fields = ''
    entity_module = importlib.import_module('springCLI.python_entities_template.'+class_name.lower())
    entity = entity_module.entity
    entity_name = entity_module.name
    imports_set_entity = set()
    imports_set_dto = set()

    for field in entity[entity_name].keys():
        annotations = ''
        field_as_var = field
        type = entity[entity_name][field][Type]
        options = entity[entity_name][field]['options']

        if ',' in field:
            field_as_var = field.replace(',', '')

        if 'List<' in type:
            imports_set_entity.add('\nimport java.util.List;')
            if 'dto' in options:
                imports_set_dto.add('\nimport java.util.List;')
        
        if 'Set<' in type:
            imports_set_entity.add('\nimport java.util.Set;')
            if 'dto' in options:
                imports_set_dto.add('\nimport java.util.Set;')

        if field_as_var.startswith('id'):
            annotations='''    @Id()'''
        entity_fields += template_field.format(
            annotations=annotations,
            type=type,
            nom_variable=field_as_var
        )
        if 'dto' in options:
            for _entity in entities_name:
                if _entity in type:
                    type = type.replace(_entity, _entity+'Dto')
            dto_fields += template_field.format(
                annotations='',
                type=type,
                nom_variable=field_as_var,
            )

    return JavaContent(entity_fields, imports_set_entity, dto_fields, imports_set_dto)
    