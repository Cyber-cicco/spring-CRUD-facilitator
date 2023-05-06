
from ..datas.autocompletion import *

name = 'Topping'

entity = {
    
    'Topping' : {
            
        'id':{
            Type: Long,
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

        'prix':{
            Type: Double,
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
                ]
        
            }
        },

        }

}


