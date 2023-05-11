import { Injectable } from '@angular/core';
import {CrudDataflowService} from "./crud-dataflow.service";
import {Menu} from "../models/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuDataflowService extends CrudDataflowService<Menu>{

  constructor() {
    super();
  }
}
