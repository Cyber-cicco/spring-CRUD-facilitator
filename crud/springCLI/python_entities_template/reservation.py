
from ..datas.autocompletion import *

name = 'Reservation'

entity = {
    
    'Reservation' : {
            
        'id':{
            Type: Long,
            options:{
                'dto':[[]]
        
            }
        },

        'utilisateur':{
            Type: "Utilisateur",
            options:{
        
            }
        },

        'salle':{
            Type: "Salle",
            options:{
                'dto':[[]]
        
            }
        },

        'nbPlacesReservees':{
            Type: Integer,
            options:{
                'dto':[[]]
        
            }
        },

        }

}


