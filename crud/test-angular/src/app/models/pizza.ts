
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/PizzaDto.java
import {Pate} from "./pate";
import {Topping} from "./topping";
import {Ingredient} from "./ingredient";
import { BaseEntity } from "./base-entity";
export interface Pizza extends BaseEntity{

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
