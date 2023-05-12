
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/UtilisateurDto.java
import {Adresse} from "./adresse";
import { BaseEntity } from "./base-entity";
import {Commande} from "./commande";
export interface Utilisateur extends BaseEntity{

  id:number,
  nom:string,
  prenom:string,
  email:string,
  motDePasse:string,
  isAdmin:boolean,
  isLivreur:boolean,
  adresseList:Partial<Adresse>[],
  commandeList:Commande[],

}
