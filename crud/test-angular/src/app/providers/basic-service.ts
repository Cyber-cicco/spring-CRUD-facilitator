import {Observable} from "rxjs";

/**
 * Définition des méthodes CRUD pour toutes formes de services.
 * Peut être convertie en classe abstraite.
 * */
export interface BasicService<T> {
  getAll():Observable<T[]>,
  getById(id:string):Observable<T>,

  deleteById(id:string):Observable<Object>

}
