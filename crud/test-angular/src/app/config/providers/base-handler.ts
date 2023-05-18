import {BaseEntity} from "../models/base-entity";
import { BaseTabEntity } from "../models/base-tab-entity";
import {BasicService} from "./basic-service";

/**
 * Interface à étendre lorsque l'on veut que le service d'une entité puisse gérer les inputs et outputs des
 * composants génériques
 * */
export interface BaseHandler<T extends BaseEntity, D extends BaseTabEntity> extends BasicService<T>{
  /**Permet de gérer le bouton de modification du tableau*/
  handleTabModifications(entity:T):void,
  /**Permet de gérer le bouton de supression du tableau*/
  handleTabSuppression(entity:T):void,
  /**Permet de gérer le bouton d'ajout du tableau*/
  handleTabAjout(entity:T):void,
  /**Permet de gérer le bouton de modification du formulaire*/
  handleFormModifications(entity:T):void,
  /**Permet de gérer le bouton de supression du formulaire*/
  handleFormSuppression(entity:T):void,
  /**Permet de gérer le bouton d'ajout du formulaire*/
  handleFormAjout(entity:T):void,


}
