//path du controller : /src/main/java/fr/cicco/crud/controller/PizzaController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Pizza} from "../models/pizza";

@Injectable({
  providedIn: 'root'
})
export class PizzaService{

   private URL_API_API_V1_PIZZA_ALL = environnement.urlApi + "/api/v1/pizza/all";
   private URL_API_API_V1_PIZZA = environnement.urlApi + "/api/v1/pizza";
   private URL_API_API_V1_PIZZA_ID = environnement.urlApi + "/api/v1/pizza/{id}";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Pizza[]>(this.URL_API_API_V1_PIZZA_ALL)
    }


    getById(id: string){
        let newURL = this.URL_API_API_V1_PIZZA_ID
        newURL = newURL.replace('{id}', id);
        return this.http.get<Pizza>(newURL)
    }


    post(dto : Pizza){
        return this.http.post<Pizza>(this.URL_API_API_V1_PIZZA,dto)
    }


    patchById(id: string, dto : Pizza){
        let newURL = this.URL_API_API_V1_PIZZA_ID
        newURL = newURL.replace('{id}', id);
        return this.http.patch<Pizza>(newURL,dto)
    }


    deleteById(id: string){
        let newURL = this.URL_API_API_V1_PIZZA_ID
        newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
