//path du controller : /src/main/java/fr/cicco/crud/controller/CinemaController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Cinema} from "../models/cinema";

@Injectable({
  providedIn: 'root'
})
export class CinemaService{

   private URL_API_API_V1_CINEMA_ID = environnement.urlApi + "/api/v1/cinema/{id}";
   private URL_API_API_V1_CINEMA_ALL = environnement.urlApi + "/api/v1/cinema/all";
   private URL_API_API_V1_CINEMA = environnement.urlApi + "/api/v1/cinema";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Cinema[]>(this.URL_API_API_V1_CINEMA_ALL)
    }


    getById(id: string){
    let newURL = this.URL_API_API_V1_CINEMA_ID
    newURL = newURL.replace('{id}', id);
        return this.http.get<Cinema>(newURL)
    }


    post(dto : Cinema){
        return this.http.post<Cinema>(this.URL_API_API_V1_CINEMA,dto)
    }


    patchById(id: string, dto : Cinema){
    let newURL = this.URL_API_API_V1_CINEMA_ID
    newURL = newURL.replace('{id}', id);
        return this.http.patch<Cinema>(newURL,dto)
    }


    deleteById(id: string){
    let newURL = this.URL_API_API_V1_CINEMA_ID
    newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
