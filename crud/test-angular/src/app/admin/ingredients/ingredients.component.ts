import { Component } from '@angular/core';
import {IngredientService} from "../../providers/ingredient.service";
import {Ingredient} from "../../models/ingredient";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";

@Component({
  selector: 'test-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends BaseAdmin{

  constructor(private ingredientService:IngredientService, mapper:BasicMapperService) {
    super();
    this.ingredientService.getAll().subscribe((value)=>{
      this.constructMap(value, mapper);
    })
  }
}
