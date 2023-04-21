template_entities = '''
from ..datas.autocompletion import *

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