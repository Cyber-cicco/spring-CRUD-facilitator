import {Component} from '@angular/core';
import { IngredientHandlerService } from './providers/ingredient-handler.service';
import { BaseAdmin } from 'src/app/config/models/base-admin';
import { Ingredient } from 'src/app/config/models/ingredient';
import { IngredientPresentation } from './models/ingredient-presentation';
import { IngredientDataflowService } from './data/ingredient-dataflow.service';
import { IngredientMapperService } from './mapper/ingredient-mapper.service';

@Component({
  selector: 'test-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends BaseAdmin<Ingredient, IngredientPresentation> {

  constructor(public ingredientService: IngredientHandlerService, public mapper: IngredientMapperService, crud: IngredientDataflowService) {
    super(crud, ingredientService);
  }
}
