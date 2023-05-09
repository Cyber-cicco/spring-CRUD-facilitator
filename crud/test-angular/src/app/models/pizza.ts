
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/PizzaDto.java
import {Pate} from "./pate";
import {Topping} from "./topping";
import {Ingredient} from "./ingredient";
export interface Pizza {

  id:number,
  nom:string,
  prix:number,
  toCreate:string,
  pate:Pate,
  code:string,
  categorie:string,
  version:number,
  toppingList:Topping[],
  ingredientList:Ingredient[],

}
