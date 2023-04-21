
from ..datas.autocompletion import *

name = 'Cinema'

entity = {
    
    'Cinema' : {
            
        'nom':{
            Type: String,
            options:{
                'dto':[[]]
        
            }
        },

        'adresse':{
            Type: "Adresse",
            options:{
                'dto':[[]]
        
            }
        },

        'salleList':{
            Type: "List<Salle>",
            options:{
                'dto':[[]]
        
            }
        },

        }

}


