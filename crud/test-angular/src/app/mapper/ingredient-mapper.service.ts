import { Injectable } from '@angular/core';
import {BasicMapperService} from "./basic-mapper.service";
import {Ingredient} from "../models/ingredient";
import {MapperService} from "./mapper.service";
import {FormMapperService} from "./form-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class IngredientMapperService extends BasicMapperService<Ingredient, Ingredient>{

  constructor(mapper:MapperService, formMapper:FormMapperService ) {
    super(mapper, formMapper)
  }

  toPresentation(entity: Ingredient): Ingredient {
    return entity;
  }
}
