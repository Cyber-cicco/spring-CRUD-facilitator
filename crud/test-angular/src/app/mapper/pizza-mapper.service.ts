import { Injectable } from '@angular/core';
import {BasicMapperService} from "./basic-mapper.service";
import {MapperService} from "./mapper.service";
import {Pizza} from "../models/pizza";
import {PizzaPresentation} from "../models/pizza-presentation";
import {FormMapperService} from "./form-mapper.service";
import {TransferFormObject} from "../models/transfer-form-object";
import {FormPizza} from "../form-models/form-pizza";

@Injectable({
  providedIn: 'root'
})
export class PizzaMapperService extends BasicMapperService<Pizza, PizzaPresentation> {

  constructor(mapper:MapperService, formMapper: FormMapperService) {
  super(mapper, formMapper);
  }

  toPresentation(pizza:Pizza):PizzaPresentation{
    return {
      id: pizza.id,
      nom: pizza.nom ,
      version: pizza.version,
      ingredients: pizza.ingredientList.map(val=>val.nom).join(', '),
      toppings: pizza.toppingList.map(val=>val.nom).join(', '),
      pate: pizza.pate?.nom!,
      prix: pizza.prix,
    }
  }

  override toFormMap(pizza: Pizza): TransferFormObject[] {
    let formPizza:FormPizza = {
      id: pizza.id,
      code: pizza.code,
      version: pizza.version,
      categorie: pizza.categorie,
      nom: pizza.nom,
      prix: pizza.prix,
      pate: pizza.pate?.nom!,
      ingredientList: pizza.ingredientList.map(p => p.nom),
      toppingList: pizza.toppingList.map(t=>t.nom),
    }
    return super.toFormMap(formPizza);
  }

  override fromFormToEntity(form: any): Pizza {
    return {
      categorie:form.categorie,
      code: form.code,
      id: form.id,
      ingredientList: form.ingredientList.map((i:any)=>{return {nom:i}}),
      nom: form.nom,
      pate: {nom:form.pate},
      prix: form.prix,
      toCreate: form.toCreate,
      toppingList: form.toppingList.map((t:any)=> {return {nom:t}}),
      version: form.version
    }
  }
}
