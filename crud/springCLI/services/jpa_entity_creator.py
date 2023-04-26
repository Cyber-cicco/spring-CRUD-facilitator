import springCLI.datas.jpa_entity_template as et
import springCLI.utils.type_finder as tf
from springCLI.utils.fileUtils import FileWriter

def create_entites(args):


    file_writer =  FileWriter()

    for class_name in args.class_name:
        fields = ''
        entites = ''
        options = '''{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }'''
        for field in args.fields:
            if ',' in field:
                field = field.replace(',','')
            field = field.strip()
            
            infered_type = tf.infere_type_by_name(field)
            if field.startswith('@'):
                field = field.replace('@', '')
                if ':' in field:
                    field = field.split(':')[0]
                    
            fields += et.field_template.format(
                field_name=field,
                field_type=infered_type,
                options=options
            )
        entites += et.template_entity.format(
            name=class_name,
            fields=fields
        )
        template_entities_str = et.template_entities.format(
            name=class_name,
            entities=entites
        )
        file_writer.write_python_file(template_entities_str, class_name)
