import re

def infere_type_by_name(type):
    returned_type = '{returned}'
    if type.endswith('List'):
        returned_type = '"List<{returned}>"'
    if type.startswith('@'):
        if type.endswith('List'):
            type = type.replace('List', '')
            returned_type = returned_type.replace('"', '')
        return '"' + returned_type.format(returned=type.replace('@','')[0].upper() + type[2:])  + '"' 
    if type.startswith('id'):
        return returned_type.format(returned='Long')
    elif re.search(r'\w*(d|D)ate\w*', type):
        return returned_type.format(returned='LocalDateTime')
    elif 'duree' in type or 'age' in type or 'length' in type or type.startswith('nb') or 'capacit' in type :
        return returned_type.format(returned='Integer')
    elif re.search(r'(e|E)xist', type):
        return returned_type.format(returned='Boolean')
    elif re.search(r'(N|n)ame', type) or re.search(r'(n|N)om', type):
        return returned_type.format(returned='String')
    else:
        return returned_type.format(returned='Object')