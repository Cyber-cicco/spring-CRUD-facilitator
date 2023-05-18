import {BaseEntity} from "../../../config/models/base-entity";

export interface AccompagnementPresentation extends BaseEntity {
  id:number,
  nom:string,
  typeAccompagnement:string,
  prix:number,

}
