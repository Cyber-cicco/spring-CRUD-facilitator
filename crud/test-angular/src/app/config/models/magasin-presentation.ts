import { BaseEntity } from "./base-entity";

export interface MagasinPresentation extends BaseEntity{
  id:number,
  nom:string,
  adresse:string,
}
