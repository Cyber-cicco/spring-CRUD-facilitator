import { Injectable } from '@angular/core';
import {BasicMapperService} from "./basic-mapper.service";
import {MapperService} from "./mapper.service";
import {Pizza} from "../models/pizza";
import {PizzaPresentation} from "../models/pizza-presentation";

@Injectable({
  providedIn: 'root'
})
export class PizzaMapperService extends BasicMapperService {

  constructor(mapper:MapperService) {
    super(mapper)
  }

  toPizzapresentation(pizza:Pizza):PizzaPresentation{
    return {
      id: pizza.id,
      nom: pizza.nom ,
      version: pizza.version,
      ingredients: (()=>{
        let res = '';
        for(let ingredient of pizza.ingredientList){
          res += ingredient.nom +' '
        }
        return res;
      })(),
      toppings: (()=>{
        let res = '';
        for(let val of pizza.toppingList){
          res += val.nom +' '
        }
        return res;
      })(),
      pate: "",
      prix: 0,
    }
  }
}
