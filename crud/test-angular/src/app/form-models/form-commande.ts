import {CommandePizza} from "../models/commandepizza";
import {CommandeMenu} from "../models/commandemenu";
import {Adresse} from "../models/adresse";

export interface FormCommande{
  id:number,
  emailClient:string,
  emailLivreur:string,
  commandePizzaList:{nom:string, nb:number}[],
  status:string,
  dateCommande:Date,
  nomMagasin:string,
  commandeMenuList:{nom:string, nb:number}[],
  rue:string,
  codePostal:string,
  ville:string
}
