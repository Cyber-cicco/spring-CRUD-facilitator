
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/CinemaDto.java
import {Salle} from "./salle";
import {Adresse} from "./adresse";


export interface Cinema {

  id:number,
  nom:string,
  nbsVisiteurParJour:number,
  salleList:Salle[],
  adresse:Adresse,

}
