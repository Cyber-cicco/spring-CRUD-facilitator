import { Injectable } from '@angular/core';
import {CrudDataflowService} from "./crud-dataflow.service";
import {Accompagnement} from "../models/accompagnement";

@Injectable({
  providedIn: 'root'
})
export class BoissonDataflowService extends CrudDataflowService<Accompagnement> {

  constructor() {
    super();
  }
}
