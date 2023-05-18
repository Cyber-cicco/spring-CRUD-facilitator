
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/CommandeMenuDto.java
import { BaseEntity } from "./base-entity";
import {Menu} from "./menu";
export interface CommandeMenu extends BaseEntity{

  id:number,
  nbMenus:number,
  menu:Partial<Menu>,

}
