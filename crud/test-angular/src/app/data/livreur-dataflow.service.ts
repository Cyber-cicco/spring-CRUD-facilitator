import { Injectable } from '@angular/core';
import {CrudDataflowService} from "./crud-dataflow.service";
import {Utilisateur} from "../models/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class LivreurDataflowService extends CrudDataflowService<Utilisateur>{

  constructor() {
    super();
  }
}
