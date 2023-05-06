//path du controller : /src/main/java/fr/cicco/crud/controller/TrajetController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Trajet} from "../models/trajet";

@Injectable({
  providedIn: 'root'
})
export class TrajetService{

   private URL_API_API_V1_TRAJET_ALL = environnement.urlApi + "/api/v1/trajet/all";
   private URL_API_API_V1_TRAJET = environnement.urlApi + "/api/v1/trajet";
   private URL_API_API_V1_TRAJET_ID = environnement.urlApi + "/api/v1/trajet/{id}";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Trajet[]>(this.URL_API_API_V1_TRAJET_ALL)
    }


    getById(id: string){
    let newURL = this.URL_API_API_V1_TRAJET_ID
    newURL = newURL.replace('{id}', id);
        return this.http.get<Trajet>(newURL)
    }


    post(dto : Trajet){
        return this.http.post<Trajet>(this.URL_API_API_V1_TRAJET,dto)
    }


    patchById(id: string, dto : Trajet){
    let newURL = this.URL_API_API_V1_TRAJET_ID
    newURL = newURL.replace('{id}', id);
        return this.http.patch<Trajet>(newURL,dto)
    }


    deleteById(id: string){
    let newURL = this.URL_API_API_V1_TRAJET_ID
    newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
