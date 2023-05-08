
from ..datas.autocompletion import *

name = 'Utilisateur'

entity = {
    
    'Utilisateur' : {
            
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

        'prenom':{
            Type: String,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'email':{
            Type: "String",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'motDePasse':{
            Type: "String",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'isAdmin':{
            Type: Boolean,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'isLivreur':{
            Type: Boolean,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'adresseList':{
            Type: "List<Adresse>",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'commandeList':{
            Type: "List<Commande>",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        }

}


