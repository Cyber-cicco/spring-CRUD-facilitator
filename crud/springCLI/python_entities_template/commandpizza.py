
from ..datas.autocompletion import *

name = 'CommandPizza'

entity = {
    
    'CommandPizza' : {
            
        'id':{
            Type: Long,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'nbPizzas':{
            Type: Integer,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'menu':{
            Type: "Menu",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'commande':{
            Type: "Commande",
            options:{
                'dto':[
                ]
        
            }
        },

        }

}


