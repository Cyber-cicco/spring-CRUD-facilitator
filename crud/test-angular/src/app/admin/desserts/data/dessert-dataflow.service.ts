import { Injectable } from '@angular/core';
import { CrudDataflowService } from 'src/app/config/data/crud-dataflow.service';
import { Accompagnement } from 'src/app/config/models/accompagnement';
import { FormCrudService } from 'src/app/shared/modal/crud/form-crud.service';
import { AccompagnementPresentation } from '../../boissons/models/accompagnement-presentation';

@Injectable({
  providedIn: 'root'
})
export class DessertDataflowService extends CrudDataflowService<Accompagnement, AccompagnementPresentation>{

  constructor(crud:FormCrudService<Accompagnement, AccompagnementPresentation>) {
    super(crud);
  }
}
