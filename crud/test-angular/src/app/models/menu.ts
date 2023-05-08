
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/MenuDto.java
import {Accompagnement} from "./accompagnement";
import {Pizza} from "./pizza";
export interface Menu {

  id:number,
  prix:number,
  nom:string,
  photo:string,
  description:string,
  accompagnementList:Accompagnement[],
  pizzaList:Pizza[],

}
