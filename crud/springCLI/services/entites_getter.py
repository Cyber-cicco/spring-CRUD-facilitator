import os
import importlib
from springCLI.datas.autocompletion import *

template_field = '''
{annotations}
    {type} {nom_variable};
'''

def find_all_entites():
    return list(map(lambda name : name[0].upper() + name.replace('.py', '')[1:], filter(lambda x: x.endswith('.py'), os.listdir('./springCLI/python_entities_template'))))

def create_entity_body(class_name):
    fields = ''
    entity_module = importlib.import_module('springCLI.python_entities_template.'+class_name.lower())
    entity = entity_module.entity
    entity_name = entity_module.name
    for field in entity[entity_name].keys():
        annotations = ''
        field_as_var = field

        if ',' in field:
            field_as_var = field.replace(',', '')

        if field_as_var.startswith('id'):
            annotations='''    @Id()'''
        fields += template_field.format(
            annotations=annotations,
            type=entity[entity_name][field][Type],
            nom_variable=field_as_var
        )
    return fields
    