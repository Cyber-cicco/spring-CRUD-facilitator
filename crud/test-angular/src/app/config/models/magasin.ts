
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/MagasinDto.java
import {Adresse} from "./adresse";
import {BaseEntity} from "./base-entity";
export interface Magasin extends BaseEntity{

  id:number,
  nom:string,
  adresse:Partial<Adresse>,

}
