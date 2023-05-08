
from ..datas.autocompletion import *

name = 'Menu'

entity = {
    
    'Menu' : {
            
        'id':{
            Type: Long,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'prix':{
            Type: Double,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'nom':{
            Type: String,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'photo':{
            Type: "String",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'description':{
            Type: "String",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'accompagnementList':{
            Type: "List<Accompagnement>",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'pizzaList':{
            Type: "List<Pizza>",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'commandeMenuList':{
            Type: "List<CommandeMenu>",
            options:{
                'dto':[
                ]
        
            }
        },

        }

}


