import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientService} from "../../providers/ingredient.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {FormObject} from "../../form-models/form-object";
import {Ingredient} from "../../models/ingredient";
import {IngredientPresentation} from "../../models/ingredient-presentation";

@Component({
  selector: 'test-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends BaseAdmin<Ingredient, IngredientPresentation> implements OnInit, OnDestroy{

  constructor(private ingredientService:IngredientService, private mapper:BasicMapperService<Ingredient, IngredientPresentation>, crud:CrudDataflowService) {
    super(crud);
    this.ingredientService.getAll().subscribe((value)=>{
      this.constructMap(value, mapper);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe(this.ingredientService, this.mapper);
  }
}
