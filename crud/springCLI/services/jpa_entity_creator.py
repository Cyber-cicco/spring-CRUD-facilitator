#import springCLI.datas.jpa_entity_template as et
import springCLI.utils.type_finder as tf
from springCLI.utils.fileUtils import FileWriter

template_entities = '''
from springCLI.datas.autocompletion import *

name = '{name}'

entity = {{
    {entities}
}}

'''

template_entity = '''
    '{name}' : {{
            {fields}
        }}
'''

field_template = '''
            '{field_name}':{{
                Type: {field_type},
                options:{options}
            }},
'''

def create_entites(args):


    file_writer =  FileWriter()

    for class_name in args.class_name:
        fields = ''
        entites = ''
        options = '{}'
        for field in args.fields:
            if ',' in field:
                field = field.replace(',','')
            field = field.strip()
            
            infered_type = tf.infere_type_by_name(field)
            if field.startswith('@'):
                field = field.replace('@', '')
            fields += field_template.format(
                field_name=field,
                field_type=infered_type,
                options=options
            )
        entites += template_entity.format(
            name=class_name,
            fields=fields
        )
        template_entities_str = template_entities.format(
            name=class_name,
            entities=entites
        )
        file_writer.write_python_file(template_entities_str, class_name)
