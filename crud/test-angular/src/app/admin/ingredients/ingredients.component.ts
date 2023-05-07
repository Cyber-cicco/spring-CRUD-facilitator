import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientService} from "../../providers/ingredient.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";

@Component({
  selector: 'test-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends BaseAdmin  implements OnInit, OnDestroy{

  constructor(private ingredientService:IngredientService, mapper:BasicMapperService, crud:CrudDataflowService) {
    super(crud);
    this.ingredientService.getAll().subscribe((value)=>{
      this.constructMap(value, mapper);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscsribe();
  }
}
