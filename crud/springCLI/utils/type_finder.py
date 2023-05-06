import re

def infere_type_by_name(type):
    returned_type = '{returned}'
    if re.search(r'List', type) :
        returned_type = '"List<{returned}>"'
    if type.startswith('@'):
        if re.search(r'List', type) :
            type = type.replace(r'List', '')
            print(type)
            returned_type = returned_type.replace('"', '')
        if ':' in type:
            type = type.split(':')[1]
            print(type)
        type = type.replace('@','')
        return '"' + returned_type.format(returned=type[0].upper() + type[1:])  + '"' 
    if type.startswith('id'):
        return returned_type.format(returned='Long')
    elif re.search(r'\w*(d|D)ate\w*', type):
        return returned_type.format(returned='LocalDateTime')
    elif 'duree' in type or 'age' in type or 'length' in type or type.startswith('nb') or 'capacit' in type :
        return returned_type.format(returned='Integer')
    elif 'price' in type or 'prix' in type:
        return returned_type.format(returned='Double') 
    elif re.search(r'(e|E)xist', type) or type.startswith('is'):
        return returned_type.format(returned='Boolean')
    elif re.search(r'(N|n)ame', type) or re.search(r'(n|N)om', type) or re.search(r'(R|r)ue', type) or re.search(r'(c|C)ity', type) or re.search(r'(v|V)ille', type):
        return returned_type.format(returned='String')
    else:
        return returned_type.format(returned='"String"')