
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/CommandePizzaDto.java
import { BaseEntity } from "./base-entity";
import {Pizza} from "./pizza";
export interface CommandePizza extends BaseEntity {

  id:number,
  nbPizzas:number,
  pizzaDto:Partial<Pizza>,

}
