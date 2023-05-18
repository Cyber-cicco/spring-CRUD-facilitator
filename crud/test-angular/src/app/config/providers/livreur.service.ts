import { Injectable } from '@angular/core';
import {UtilisateurService} from "./utilisateur.service";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../models/utilisateur";
import {environnement} from "../environnements/environnement";

@Injectable({
  providedIn: 'root'
})
export class LivreurService extends UtilisateurService{

  private URL_API_API_V1_LIVREUR_ALL= environnement.urlApi + "/api/v1/utilisateur/livreurs";
  constructor(http:HttpClient) {
    super(http);
  }

  override getAll(){
    return this.http.get<Utilisateur[]>(this.URL_API_API_V1_LIVREUR_ALL);
  }
}
