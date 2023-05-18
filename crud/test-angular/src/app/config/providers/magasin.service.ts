//path du controller : /src/main/java/fr/cicco/crud/controller/MagasinController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Magasin} from "../models/magasin";

@Injectable({
  providedIn: 'root'
})
export class MagasinService{

   private URL_API_API_V1_MAGASIN = environnement.urlApi + "/api/v1/magasin";
   private URL_API_API_V1_MAGASIN_ALL = environnement.urlApi + "/api/v1/magasin/all";
   private URL_API_API_V1_MAGASIN_ID = environnement.urlApi + "/api/v1/magasin/{id}";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Magasin[]>(this.URL_API_API_V1_MAGASIN_ALL)
    }


    getById(id: string){
        let newURL = this.URL_API_API_V1_MAGASIN_ID
        newURL = newURL.replace('{id}', id);
        return this.http.get<Magasin>(newURL)
    }


    post(dto : Magasin){
        return this.http.post<Magasin>(this.URL_API_API_V1_MAGASIN,dto)
    }


    patchById(id: string, dto : Magasin){
        let newURL = this.URL_API_API_V1_MAGASIN_ID
        newURL = newURL.replace('{id}', id);
        return this.http.patch<Magasin>(newURL,dto)
    }


    deleteById(id: string){
        let newURL = this.URL_API_API_V1_MAGASIN_ID
        newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }



}
