import {Observable} from "rxjs";
import {BaseEntity} from "../models/base-entity";

/**
 * Définition des méthodes CRUD pour toutes formes de services.
 * Peut être convertie en classe abstraite.
 * */
export interface BasicService<T extends BaseEntity> {
  getAll():Observable<T[]>,
  getById(id:string):Observable<T>,
  patchById(id:string, dto:Partial<T>):Observable<T>,
  deleteById(id:string):Observable<Object>

}
