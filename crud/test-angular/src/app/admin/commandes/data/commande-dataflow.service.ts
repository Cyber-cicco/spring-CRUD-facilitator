import { Injectable } from '@angular/core';
import {CrudDataflowService} from "../../../config/data/crud-dataflow.service";
import {Commande} from "../../../config/models/commande";
import {CommandePresentation} from "../models/commande-presentation";
import {FormCrudService} from "../../../shared/modal/crud/form-crud.service";

@Injectable({
  providedIn: 'root'
})
export class CommandeDataflowService extends CrudDataflowService<Commande, CommandePresentation>{

  constructor(formCrud:FormCrudService<Commande, CommandePresentation>) {
    super(formCrud);
  }
}
