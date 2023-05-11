import { Injectable } from '@angular/core';
import {CrudDataflowService} from "./crud-dataflow.service";
import {Commande} from "../models/commande";

@Injectable({
  providedIn: 'root'
})
export class CommandeDataflowService extends CrudDataflowService<Commande>{

  constructor() {
    super();
  }
}
