import { BaseEntity } from "src/app/config/models/base-entity"

export interface PizzaPresentation extends BaseEntity{
  id:number,
  nom:string,
  prix:number,
  pate:string,
  version:number
  toppings:string,
  ingredients:string,
}
