
///home/hijokaidan/Documents/ProjetsCode/spring-CRUD-facilitator/crud/src/main/java/fr/cicco/crud/dto/CommandeDto.java
import {CommandePizza} from "./commandepizza";
import {CommandeMenu} from "./commandemenu";
import {Adresse} from "./adresse";
export interface Commande {

  id:number,
  emailClient:string,
  emailLivreur:string,
  commandePizzaList:Partial<CommandePizza>[],
  status:string,
  dateCommande:Date,
  nomMagasin:string,
  commandeMenuList:Partial<CommandeMenu>[],
  adresse:Partial<Adresse>,

}
