import {Component} from '@angular/core';
import {IngredientService} from "../../providers/ingredient.service";
import {BaseAdmin} from "../../models/base-admin";
import {Ingredient} from "../../models/ingredient";
import {IngredientPresentation} from "../../models/ingredient-presentation";
import {MatDialog} from "@angular/material/dialog";
import {IngredientDataflowService} from "../../data/ingredient-dataflow.service";
import {IngredientMapperService} from "../../mapper/ingredient-mapper.service";

@Component({
  selector: 'test-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends BaseAdmin<Ingredient, IngredientPresentation> {

  constructor(public ingredientService: IngredientService, public mapper: IngredientMapperService, crud: IngredientDataflowService, modalService: MatDialog) {
    super(crud, modalService, ingredientService);
  }
}
