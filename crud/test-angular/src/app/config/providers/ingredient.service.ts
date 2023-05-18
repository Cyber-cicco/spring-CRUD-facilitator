//path du controller : /src/main/java/fr/cicco/crud/controller/IngredientController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Ingredient} from "../models/ingredient";
import {BaseHandler} from "./base-handler";
import { BasicService } from './basic-service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService implements BasicService<Ingredient>{

   private URL_API_API_V1_INGREDIENT_ID = environnement.urlApi + "/api/v1/ingredient/{id}";
   private URL_API_API_V1_INGREDIENT = environnement.urlApi + "/api/v1/ingredient";
   private URL_API_API_V1_INGREDIENT_ALL = environnement.urlApi + "/api/v1/ingredient/all";


    constructor(private http:HttpClient){}

  handleModifications(form: Ingredient): void {
        throw new Error('Method not implemented.');
    }


    getAll(){
        return this.http.get<Ingredient[]>(this.URL_API_API_V1_INGREDIENT_ALL)
    }


    getById(id: string){
        let newURL = this.URL_API_API_V1_INGREDIENT_ID
        newURL = newURL.replace('{id}', id);
        return this.http.get<Ingredient>(newURL)
    }


    post(dto : Ingredient){
        return this.http.post<Ingredient>(this.URL_API_API_V1_INGREDIENT,dto)
    }


    patchById(id: string, dto : Ingredient){
        let newURL = this.URL_API_API_V1_INGREDIENT_ID
        newURL = newURL.replace('{id}', id);
        return this.http.patch<Ingredient>(newURL,dto)
    }


    deleteById(id: string){
        let newURL = this.URL_API_API_V1_INGREDIENT_ID
        newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }


    handleAjout(form: Ingredient): void {

    }

}
