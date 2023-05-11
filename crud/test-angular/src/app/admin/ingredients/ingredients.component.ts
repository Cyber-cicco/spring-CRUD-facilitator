import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientService} from "../../providers/ingredient.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {Ingredient} from "../../models/ingredient";
import {IngredientPresentation} from "../../models/ingredient-presentation";
import {MatDialog} from "@angular/material/dialog";
import {IngredientDataflowService} from "../../data/ingredient-dataflow.service";

@Component({
  selector: 'test-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends BaseAdmin<Ingredient, IngredientPresentation> {

  constructor(public ingredientService: IngredientService, public mapper: BasicMapperService<Ingredient, IngredientPresentation>, crud: IngredientDataflowService, modalService: MatDialog) {
    super(crud, modalService);
  }
}
