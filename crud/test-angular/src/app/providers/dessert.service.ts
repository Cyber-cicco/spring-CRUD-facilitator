import { Injectable } from '@angular/core';
import {AccompagnementService} from "./accompagnement.service";
import {HttpClient} from "@angular/common/http";
import {Accompagnement} from "../models/accompagnement";
import {Observable} from "rxjs";
import {environnement} from "../environnements/environnement";

@Injectable({
  providedIn: 'root'
})
export class DessertService extends AccompagnementService{

  private URL_API_API_V1_DESSERT_ALL = environnement.urlApi + "/api/v1/accompagnement/desserts/all"
  constructor(http:HttpClient) {
    super(http)
  }

  override getAll(): Observable<Accompagnement[]> {
    return this.http.get<Accompagnement[]>(this.URL_API_API_V1_DESSERT_ALL);
  }
}
