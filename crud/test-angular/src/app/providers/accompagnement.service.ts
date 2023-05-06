//path du controller : /src/main/java/fr/cicco/crud/controller/AccompagnementController.java
import { environnement } from "../environnements/environnement";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Accompagnement} from "../models/accompagnement";

@Injectable({
  providedIn: 'root'
})
export class AccompagnementService{

   private URL_API_API_V1_ACCOMPAGNEMENT = environnement.urlApi + "/api/v1/accompagnement";
   private URL_API_API_V1_ACCOMPAGNEMENT_ALL = environnement.urlApi + "/api/v1/accompagnement/all";
   private URL_API_API_V1_ACCOMPAGNEMENT_ID = environnement.urlApi + "/api/v1/accompagnement/{id}";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Accompagnement[]>(this.URL_API_API_V1_ACCOMPAGNEMENT_ALL)
    }


    getById(id: string){
        let newURL = this.URL_API_API_V1_ACCOMPAGNEMENT_ID
        newURL = newURL.replace('{id}', id);
        return this.http.get<Accompagnement>(newURL)
    }


    post(dto : Accompagnement){
        return this.http.post<Accompagnement>(this.URL_API_API_V1_ACCOMPAGNEMENT,dto)
    }


    patchById(id: string, dto : Accompagnement){
        let newURL = this.URL_API_API_V1_ACCOMPAGNEMENT_ID
        newURL = newURL.replace('{id}', id);
        return this.http.patch<Accompagnement>(newURL,dto)
    }


    deleteById(id: string){
        let newURL = this.URL_API_API_V1_ACCOMPAGNEMENT_ID
        newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
