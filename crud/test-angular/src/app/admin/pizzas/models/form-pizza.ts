import { BaseEntity } from "src/app/config/models/base-entity"

export interface FormPizza extends BaseEntity{

  id:number,
  code:string,
  nom:string,
  prix:number,
  pate:string,
  categorie:string,
  version:number,
  toppingList:string[],
  ingredientList:string[]
}
