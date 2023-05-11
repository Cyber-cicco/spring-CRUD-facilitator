import { Injectable } from '@angular/core';
import {CrudDataflowService} from "./crud-dataflow.service";
import {Ingredient} from "../models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientDataflowService extends CrudDataflowService<Ingredient>{

  constructor() {
    super();
  }
}
