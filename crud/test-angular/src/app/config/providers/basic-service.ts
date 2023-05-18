import {Observable} from "rxjs";
import {BaseEntity} from "../models/base-entity";

/**
 * Définition des méthodes CRUD pour toutes formes de services.
 * Peut être convertie en classe abstraite.
 * */
export interface BasicService<T extends BaseEntity> {
  /**Récupère toutes les entités de la base de données*/
  getAll():Observable<T[]>,
  /**Permet de récupérer une entité par ID*/
  getById(id:string):Observable<T>,

}
