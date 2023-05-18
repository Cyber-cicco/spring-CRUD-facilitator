//path du controller : /src/main/java/fr/cicco/crud/controller/MenuController.java
import { environnement } from '../environnements/environnement';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Menu} from "../models/menu";
import { BasicService } from './basic-service';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements BasicService<Menu>{

   private URL_API_API_V1_MENU_ALL = environnement.urlApi + "/api/v1/menu/all";
   private URL_API_API_V1_MENU = environnement.urlApi + "/api/v1/menu";
   private URL_API_API_V1_MENU_ID = environnement.urlApi + "/api/v1/menu/{id}";


    constructor(private http:HttpClient){}


    getAll(){
        return this.http.get<Menu[]>(this.URL_API_API_V1_MENU_ALL)
    }


    getById(id: string){
        let newURL = this.URL_API_API_V1_MENU_ID
        newURL = newURL.replace('{id}', id);
        return this.http.get<Menu>(newURL)
    }


    post(dto : Menu){
        return this.http.post<Menu>(this.URL_API_API_V1_MENU,dto)
    }


    patchById(id: string, dto : Menu){
        let newURL = this.URL_API_API_V1_MENU_ID
        newURL = newURL.replace('{id}', id);
        return this.http.patch<Menu>(newURL,dto)
    }


    deleteById(id: string){
        let newURL = this.URL_API_API_V1_MENU_ID
        newURL = newURL.replace('{id}', id);
        return this.http.delete<Object>(newURL)
    }

  handleModifications(form: Menu): void {
  }

  handleAjout(form: Menu) {
  }


}
