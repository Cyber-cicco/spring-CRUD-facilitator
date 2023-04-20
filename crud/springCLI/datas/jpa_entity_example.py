from autocompletion import *

entities = {
    "TestEntity" : {
        'id':{
            Type: Long,
            options:[
                Id
            ]
        },
        'name':{
            Type: String,
            options:[]
        },
        'listOfLongs':{
            Type:List+Long,
            options:[]
        }
        
    }
}