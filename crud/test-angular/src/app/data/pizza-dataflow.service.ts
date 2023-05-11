import { Injectable } from '@angular/core';
import {CrudDataflowService} from "./crud-dataflow.service";
import {Pizza} from "../models/pizza";

@Injectable({
  providedIn: 'root'
})
export class PizzaDataflowService extends CrudDataflowService<Pizza>{

  constructor() {
    super();
  }
}
