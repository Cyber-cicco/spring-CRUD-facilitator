import { BaseEntity } from "src/app/config/models/base-entity";

export interface MenuPresentation extends BaseEntity{
  id:number,
  prix:number,
  nom:string,
  accompagnements:string,
  pizzas:string,

}
