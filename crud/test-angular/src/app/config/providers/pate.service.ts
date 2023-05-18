//path du controller : /src/main/java/fr/cicco/crud/controller/PateController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Pate} from "../models/pate";
import {BaseHandler} from "./base-handler";
import { BasicService } from './basic-service';

@Injectable({
  providedIn: 'root'
})
export class PateService implements BasicService<Pate> {

   private URL_API_API_V1_PATE_ID = environnement.urlApi + "/api/v1/pate/{id}";
   private URL_API_API_V1_PATE_ALL = environnement.urlApi + "/api/v1/pate/all";
   private URL_API_API_V1_PATE = environnement.urlApi + "/api/v1/pate";


    constructor(private http:HttpClient){}

  handleModifications(form: Pate): void {
        throw new Error('Method not implemented.');
    }


    getAll(){
        return this.http.get<Pate[]>(this.URL_API_API_V1_PATE_ALL)
    }


    getById(id: string){
        let newURL = this.URL_API_API_V1_PATE_ID
        newURL = newURL.replace('{id}', id);
        return this.http.get<Pate>(newURL)
    }


    post(dto : Pate){
        return this.http.post<Pate>(this.URL_API_API_V1_PATE,dto)
    }


    patchById(id: string, dto : Pate){
        let newURL = this.URL_API_API_V1_PATE_ID
        newURL = newURL.replace('{id}', id);
        return this.http.patch<Pate>(newURL,dto)
    }


    deleteById(id: string){
        let newURL = this.URL_API_API_V1_PATE_ID
        newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



    handleAjout(form: Pate): void {

    }
}
