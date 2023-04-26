
from ..datas.autocompletion import *

name = 'Cinema'

entity = {
    
    'Cinema' : {
            
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

        'adresse':{
            Type: "Adresse",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        }

}


