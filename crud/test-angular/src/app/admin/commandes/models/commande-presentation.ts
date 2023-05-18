import {BaseEntity} from "../../../config/models/base-entity";

export interface CommandePresentation extends BaseEntity{
  id:number,
  emailClient:string,
  emailLivreur:string,
  commandePizzaList:string,
  status:string,
  dateCommande:string,
  commandeMenuList:string,
  adresse:string,
}
