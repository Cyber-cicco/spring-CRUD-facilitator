
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

        'nomRue':{
            Type: String,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'nomVille':{
            Type: String,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'codePostal':{
            Type: Object,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        }

}


