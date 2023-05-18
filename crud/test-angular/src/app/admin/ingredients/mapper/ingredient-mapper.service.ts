import { Injectable } from '@angular/core';
import { BasicMapperService } from 'src/app/config/mapper/basic-mapper.service';
import { Ingredient } from 'src/app/config/models/ingredient';
import { MapperService } from 'src/app/config/mapper/mapper.service';
import { FormMapperService } from 'src/app/config/mapper/form-mapper.service';

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

  override fromFormToEntity(form: any): Ingredient {
    return {id: form.id, nom: form.nom, prix: form.prix};
  }
}
