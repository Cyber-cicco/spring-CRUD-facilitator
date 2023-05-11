import {Accompagnement} from "./accompagnement";
import { BaseEntity } from "./base-entity";

export interface AccompagnementPresentation extends BaseEntity {
  id:number,
  nom:string,
  typeAccompagnement:string,
  prix:number,

}
