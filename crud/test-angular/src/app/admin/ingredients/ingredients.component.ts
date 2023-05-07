import { Component } from '@angular/core';
import {IngredientService} from "../../providers/ingredient.service";
import {Ingredient} from "../../models/ingredient";

@Component({
  selector: 'test-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {

  items:Ingredient[] = [];

  constructor(private ingredientService:IngredientService) {
    this.ingredientService.getAll().subscribe((value)=>{
      this.items = value;
    })
  }
}
