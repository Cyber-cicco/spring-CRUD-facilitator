
from ..datas.autocompletion import *

name = 'Pate'

entity = {
    
    'Pate' : {
            
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


