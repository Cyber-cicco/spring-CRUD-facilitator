
from ..datas.autocompletion import *

name = 'Utilisateur'

entity = {
    
    'Utilisateur' : {
            
        'id':{
            Type: Long,
            options:{
                'dto':[[]]
        
            }
        },

        'nom':{
            Type: String,
            options:{
                'dto':[[]]
        
            }
        },

        'prenom':{
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

        'reservationList':{
            Type: "List<Reservation>",
            options:{
                'dto':[[]]
        
            }
        },

        'mdp':{
            Type: Object,
            options:{
                'dto':[[]]
        
            }
        },

        }

}


