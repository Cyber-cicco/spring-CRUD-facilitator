import { BaseEntity } from "src/app/config/models/base-entity";

export interface UtilisateurPresentation extends BaseEntity{
    id:number,
    nom:string,
    prenom:string,
    email:string,
    adresse:string,

}
