import { Injectable } from '@angular/core';
import {CrudDataflowService} from "../../../config/data/crud-dataflow.service";
import {Accompagnement} from "../../../config/models/accompagnement";
import {AccompagnementPresentation} from "../models/accompagnement-presentation";
import {FormCrudService} from "../../../shared/modal/crud/form-crud.service";

@Injectable({
  providedIn: 'root'
})
export class BoissonDataflowService extends CrudDataflowService<Accompagnement, AccompagnementPresentation> {

  constructor(formCrud:FormCrudService<Accompagnement, AccompagnementPresentation>) {
    super(formCrud);
  }
}
