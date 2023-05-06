
from ..datas.autocompletion import *

name = 'CommandeMenu'

entity = {
    
    'CommandeMenu' : {
            
        'id':{
            Type: Long,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'nbMenus':{
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


