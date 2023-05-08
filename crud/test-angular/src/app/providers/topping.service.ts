//path du controller : /src/main/java/fr/cicco/crud/controller/ToppingController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Topping} from "../models/topping";
import {BasicService} from "./basic-service";

@Injectable({
  providedIn: 'root'
})
export class ToppingService implements BasicService<Topping>{

   private URL_API_API_V1_TOPPING_ID = environnement.urlApi + "/api/v1/topping/{id}";
   private URL_API_API_V1_TOPPING = environnement.urlApi + "/api/v1/topping";
   private URL_API_API_V1_TOPPING_ALL = environnement.urlApi + "/api/v1/topping/all";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Topping[]>(this.URL_API_API_V1_TOPPING_ALL)
    }


    getById(id: string){
        let newURL = this.URL_API_API_V1_TOPPING_ID
        newURL = newURL.replace('{id}', id);
        return this.http.get<Topping>(newURL)
    }


    post(dto : Topping){
        return this.http.post<Topping>(this.URL_API_API_V1_TOPPING,dto)
    }


    patchById(id: string, dto : Topping){
        let newURL = this.URL_API_API_V1_TOPPING_ID
        newURL = newURL.replace('{id}', id);
        return this.http.patch<Topping>(newURL,dto)
    }


    deleteById(id: string){
        let newURL = this.URL_API_API_V1_TOPPING_ID
        newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
