//path du controller : /src/main/java/fr/cicco/crud/controller/UtilisateurController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Utilisateur} from "../models/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService{

   private URL_API_API_V1_UTILISATEUR_ALL = environnement.urlApi + "/api/v1/utilisateur/all";
   private URL_API_API_V1_UTILISATEUR = environnement.urlApi + "/api/v1/utilisateur";
   private URL_API_API_V1_UTILISATEUR_ID = environnement.urlApi + "/api/v1/utilisateur/{id}";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Utilisateur[]>(this.URL_API_API_V1_UTILISATEUR_ALL)
    }


    getById(id: string){
    let newURL = this.URL_API_API_V1_UTILISATEUR_ID
    newURL = newURL.replace('{id}', id);
        return this.http.get<Utilisateur>(newURL)
    }


    post(dto : Utilisateur){
        return this.http.post<Utilisateur>(this.URL_API_API_V1_UTILISATEUR,dto)
    }


    patchById(id: string, dto : Utilisateur){
    let newURL = this.URL_API_API_V1_UTILISATEUR_ID
    newURL = newURL.replace('{id}', id);
        return this.http.patch<Utilisateur>(newURL,dto)
    }


    deleteById(id: string){
    let newURL = this.URL_API_API_V1_UTILISATEUR_ID
    newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
