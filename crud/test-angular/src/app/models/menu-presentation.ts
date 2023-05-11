import { BaseEntity } from "./base-entity";
export interface MenuPresentation extends BaseEntity{
  id:number,
  prix:number,
  nom:string,
  accompagnements:string,
  pizzas:string,

}
