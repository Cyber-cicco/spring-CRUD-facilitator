import { Injectable } from '@angular/core';
import { CrudDataflowService } from 'src/app/config/data/crud-dataflow.service';
import { Pizza } from 'src/app/config/models/pizza';
import { FormCrudService } from 'src/app/shared/modal/crud/form-crud.service';
import { PizzaPresentation } from '../models/pizza-presentation';

@Injectable({
  providedIn: 'root'
})
export class PizzaDataflowService extends CrudDataflowService<Pizza, PizzaPresentation>{

  constructor(crud:FormCrudService<Pizza, PizzaPresentation>) {
    super(crud);
  }
}
