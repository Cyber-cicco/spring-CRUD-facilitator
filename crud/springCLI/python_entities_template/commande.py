
from ..datas.autocompletion import *

name = 'Commande'

entity = {
    
    'Commande' : {
            
        'id':{
            Type: Long,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'livreur':{
            Type: "Utilisateur",
            options:{
                'dto':[
                    {'exists':True, 'fields':["email"]}
                ]
        
            }
        },

        'commandePizzaList':{
            Type: "List<CommandePizza>",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'client':{
            Type: "Utilisateur",
            options:{
                'dto':[
                    {'exists':True, 'fields':["email"]}
                ]
        
            }
        },

        'status':{
            Type: "String",
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'dateCommande':{
            Type: LocalDateTime,
            options:{
                'dto':[
                    {'exists':True, 'fields':[]}
                ]
        
            }
        },

        'magasin':{
            Type: "Magasin",
            options:{
                'dto':[
                    {'exists':True, 'fields':["nom"]}
                ]
        
            }
        },

        'commandeMenuList':{
            Type: "List<CommandeMenu>",
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


