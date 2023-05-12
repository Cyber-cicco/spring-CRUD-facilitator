import { Injectable } from '@angular/core';
import {UtilisateurService} from "./utilisateur.service";
import {HttpClient} from "@angular/common/http";
import {environnement} from "../environnements/environnement";
import {Utilisateur} from "../models/utilisateur";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends UtilisateurService {


  private URL_API_API_V1_CLIENT_ALL = environnement.urlApi + "/api/v1/utilisateur/clients";
  constructor(http:HttpClient) {
    super(http)
  }


  override getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.URL_API_API_V1_CLIENT_ALL);
  }

  override handleModifications(form: Utilisateur) {
    console.log(form);
  }
}
