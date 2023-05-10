import {Accompagnement} from "../models/accompagnement";
import {Pizza} from "../models/pizza";

export interface FormMenu {
  id:number,
  prix:number,
  nom:string,
  photo:string,
  description:string,
  boisson:string,
  encas:string,
  dessert:string,
  pizzaList:string[],
}
