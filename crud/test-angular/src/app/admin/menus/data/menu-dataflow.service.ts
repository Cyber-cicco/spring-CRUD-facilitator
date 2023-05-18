import { Injectable } from '@angular/core';
import { CrudDataflowService } from 'src/app/config/data/crud-dataflow.service';
import { Menu } from 'src/app/config/models/menu';
import { FormCrudService } from 'src/app/shared/modal/crud/form-crud.service';
import { MenuPresentation } from '../models/menu-presentation';

@Injectable({
  providedIn: 'root'
})
export class MenuDataflowService extends CrudDataflowService<Menu, MenuPresentation>{

  constructor(formCrud:FormCrudService<Menu, MenuPresentation>) {
    super(formCrud);
  }
}
