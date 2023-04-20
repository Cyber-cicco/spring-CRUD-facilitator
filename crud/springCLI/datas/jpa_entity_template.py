template_entites = '''
from autocompletion import *

entities = {
    {entities}
}


'''

template_entity = '''
    '{name}' : {
            {fields}
        }
'''

field_template = '''
        '{field_name}':{
            Type: {field_type},
            options:{options}
        },
'''