import { BaseEntity } from "./base-entity";

///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/IngredientDto.java
export interface Ingredient extends BaseEntity {

  id:number,
  nom:string,
  prix:number,

}
