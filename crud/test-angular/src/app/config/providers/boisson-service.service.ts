import { Injectable } from '@angular/core';
import {AccompagnementService} from "./accompagnement.service";
import {HttpClient} from "@angular/common/http";
import {environnement} from "../environnements/environnement";
import {Observable} from "rxjs";
import {Accompagnement} from "../models/accompagnement";

@Injectable({
  providedIn: 'root'
})
export class BoissonServiceService extends AccompagnementService{

  private URL_API_API_V1_BOISSONS_ALL = environnement.urlApi + "/api/v1/accompagnement/boissons/all"
  constructor(http:HttpClient) {
    super(http);
  }

  override getAll(): Observable<Accompagnement[]> {
    return this.http.get<Accompagnement[]>(this.URL_API_API_V1_BOISSONS_ALL);
  }

}
