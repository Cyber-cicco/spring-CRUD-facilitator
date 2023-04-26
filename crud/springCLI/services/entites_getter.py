import os
import importlib
from springCLI.datas.autocompletion import *

template_field = '''{annotations}    private {type} {nom_variable};
'''

class JavaContent:

    def __init__(self, entity_fields, entity_imports, dto_fields, dto_imports) -> None:
        self.entity_fields = entity_fields
        self.entity_imports = ''.join(entity_imports)
        self.dto_fields = dto_fields
        self.dto_imports = ''.join(dto_imports)

def find_all_entites():
    return list(map(lambda name : name[0].upper() + name.replace('.py', '')[1:], filter(lambda x: x.endswith('.py'), os.listdir('./springCLI/python_entities_template'))))

def find_type_by_entity_name(class_name, field_name):
    entity_module = importlib.import_module('springCLI.python_entities_template.'+class_name.lower())
    entity = entity_module.entity
    entity_name = entity_module.name
    for field in entity[entity_name].keys():
        if field == field_name:
            return entity[entity_name][field][Type]
    raise Exception("Le nom d'un field du DTO ne correspond pas à un field de l'entité")

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
            annotations='''    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
'''
            imports_set_entity.add('''
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;''')
        entity_fields += template_field.format(
            annotations=annotations,
            type=type,
            nom_variable=field_as_var
        )
        if 'dto' in options:
            for dto in options['dto']:
                if dto['exists']:
                    for _entity in entities_name:
                        if _entity in type and not dto['fields']:
                            type = type.replace(_entity, _entity+'Dto')
                    if not dto['fields']:
                        dto_fields += template_field.format(
                            annotations='',
                            type=type,
                            nom_variable=field_as_var,
                        )
                    else:
                        for _field in dto['fields']:
                            field_as_var = _field + type
                            new_type = find_type_by_entity_name(type, _field)
                            dto_fields += template_field.format(
                                annotations='',
                                type=new_type,
                                nom_variable=field_as_var,
                            )

    return JavaContent(entity_fields, imports_set_entity, dto_fields, imports_set_dto)
    