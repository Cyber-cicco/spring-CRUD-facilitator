
from ..datas.autocompletion import *

name = 'Adresse'

entity = {
    
    'Adresse' : {
            
        'id':{
            Type: Long,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'rue':{
            Type: String,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'ville':{
            Type: String,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'codePostal':{
            Type: "String",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        }

}


