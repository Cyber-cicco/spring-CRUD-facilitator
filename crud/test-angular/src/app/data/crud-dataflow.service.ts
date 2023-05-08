import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {TransferFormObject} from "../models/transfer-form-object";

@Injectable({
  providedIn: 'root'
})
export class CrudDataflowService {

  private supprSubject:BehaviorSubject<number> =  new BehaviorSubject<number>(0);
  private confSupprSubject:Subject<number> = new Subject();
  private modifSubject:BehaviorSubject<TransferFormObject[]> = new BehaviorSubject<TransferFormObject[]>([]);
  private modifNotifSubject:Subject<number> = new Subject<number>();
  private confModifSubject:Subject<any> = new Subject();
  private creationSubject:Subject<boolean> = new Subject();
  private confCreationSubject:Subject<any> = new Subject();
  constructor() {}

  public getSupprSubject(){
    return this.supprSubject;
  }
  public getConfSupprSubject(){
    return this.confSupprSubject;
  }
  public getModifSubject(){
    return this.modifSubject;
  }
  public getConfModifSubject(){
    return this.confModifSubject;
  }

  public getCreationSubject(){
    return this.creationSubject;
  }
  public getConfCreationSubject(){
    return this.confCreationSubject;
  }
  public getModifNotifSubject(){
    return this.modifNotifSubject;
  }
}
