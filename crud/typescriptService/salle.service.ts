//path du controller : /src/main/java/fr/cicco/crud/controller/SalleController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Salle} from "../models/salle";

@Injectable({
  providedIn: 'root'
})
export class SalleService{

   private URL_API_API_V1_SALLE_ID = environnement.urlApi + "/api/v1/salle/{id}";
   private URL_API_API_V1_SALLE_ALL = environnement.urlApi + "/api/v1/salle/all";
   private URL_API_API_V1_SALLE = environnement.urlApi + "/api/v1/salle";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Salle[]>(this.URL_API_API_V1_SALLE_ALL)
    }


    getById(id: string){
    let newURL = this.URL_API_API_V1_SALLE_ID
    newURL = newURL.replace('{id}', id);
        return this.http.get<Salle>(newURL)
    }


    post(dto : Salle){
        return this.http.post<Salle>(this.URL_API_API_V1_SALLE,dto)
    }


    patchById(id: string, dto : Salle){
    let newURL = this.URL_API_API_V1_SALLE_ID
    newURL = newURL.replace('{id}', id);
        return this.http.patch<Salle>(newURL,dto)
    }


    deleteById(id: string){
    let newURL = this.URL_API_API_V1_SALLE_ID
    newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
