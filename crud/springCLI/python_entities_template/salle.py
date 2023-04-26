
from ..datas.autocompletion import *

name = 'Salle'

entity = {
    
    'Salle' : {
            
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

        'cinema':{
            Type: "Cinema",
            options:{
                'dto':[
                    {'exists':True, 'fields':['nom', 'nbsVisiteurParJour' ]}
                ]
        
            }
        },

        'nbPlacesDisponibles':{
            Type: Integer,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'nbPlacesReserves':{
            Type: Integer,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        }

}


