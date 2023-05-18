import { BaseEntity } from "src/app/config/models/base-entity";

export interface IngredientPresentation extends BaseEntity{
  id:number,
  nom:string,
  prix:number,

}
