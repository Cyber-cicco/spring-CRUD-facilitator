//path du controller : /src/main/java/fr/cicco/crud/controller/AdresseController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Adresse} from "../models/adresse";

@Injectable({
  providedIn: 'root'
})
export class AdresseService{

   private URL_API_API_V1_ADRESSE_ALL = environnement.urlApi + "/api/v1/adresse/all";
   private URL_API_API_V1_ADRESSE_ID = environnement.urlApi + "/api/v1/adresse/{id}";
   private URL_API_API_V1_ADRESSE = environnement.urlApi + "/api/v1/adresse";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Adresse[]>(this.URL_API_API_V1_ADRESSE_ALL)
    }


    getById(id: string){
    let newURL = this.URL_API_API_V1_ADRESSE_ID
    newURL = newURL.replace('{id}', id);
        return this.http.get<Adresse>(newURL)
    }


    post(dto : Adresse){
        return this.http.post<Adresse>(this.URL_API_API_V1_ADRESSE,dto)
    }


    patchById(id: string, dto : Adresse){
    let newURL = this.URL_API_API_V1_ADRESSE_ID
    newURL = newURL.replace('{id}', id);
        return this.http.patch<Adresse>(newURL,dto)
    }


    deleteById(id: string){
    let newURL = this.URL_API_API_V1_ADRESSE_ID
    newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
