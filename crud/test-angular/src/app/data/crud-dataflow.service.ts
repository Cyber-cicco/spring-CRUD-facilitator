import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudDataflowService {

  private supprSubject:Subject<number> =  new Subject();
  private modifSubject:Subject<number> = new Subject();
  constructor() {}



}
