import { BaseEntity } from "./base-entity";
export interface UtilisateurPresentation extends BaseEntity{
    id:number,
    nom:string,
    prenom:string,
    email:string,
    adresse:string,

}
