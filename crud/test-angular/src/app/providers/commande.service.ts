//path du controller : /src/main/java/fr/cicco/crud/controller/CommandeController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Commande} from "../models/commande";
import {BaseHandler} from "./base-handler";
import {CommandePresentation} from "../models/commande-presentation";

@Injectable({
  providedIn: 'root'
})
export class CommandeService implements BaseHandler<Commande, CommandePresentation>{

   private URL_API_API_V1_COMMANDE = environnement.urlApi + "/api/v1/commande";
   private URL_API_API_V1_COMMANDE_ID = environnement.urlApi + "/api/v1/commande/{id}";
   private URL_API_API_V1_COMMANDE_ALL = environnement.urlApi + "/api/v1/commande/all";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Commande[]>(this.URL_API_API_V1_COMMANDE_ALL)
    }


    getById(id: string){
        let newURL = this.URL_API_API_V1_COMMANDE_ID
        newURL = newURL.replace('{id}', id);
        return this.http.get<Commande>(newURL)
    }


    post(dto : Commande){
        return this.http.post<Commande>(this.URL_API_API_V1_COMMANDE,dto)
    }


    patchById(id: string, dto : Commande){
        let newURL = this.URL_API_API_V1_COMMANDE_ID
        newURL = newURL.replace('{id}', id);
        return this.http.patch<Commande>(newURL,dto)
    }


    deleteById(id: string){
        let newURL = this.URL_API_API_V1_COMMANDE_ID
        newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }

  handleModifications(form: any): void {
  }



  handleAjout(form: Commande): void {

  }
}
