import { Injectable } from '@angular/core';
import { CrudDataflowService } from 'src/app/config/data/crud-dataflow.service';
import { Ingredient } from 'src/app/config/models/ingredient';
import { IngredientPresentation } from 'src/app/admin/ingredients/models/ingredient-presentation';
import { FormCrudService } from 'src/app/shared/modal/crud/form-crud.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientDataflowService extends CrudDataflowService<Ingredient, IngredientPresentation>{

  constructor(formCrudService:FormCrudService<Ingredient, IngredientPresentation>) {
    super(formCrudService);
  }
}
