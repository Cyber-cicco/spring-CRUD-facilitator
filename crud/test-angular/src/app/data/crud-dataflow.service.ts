import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class CrudDataflowService<T> {

  private supprSubject:BehaviorSubject<number> =  new BehaviorSubject<number>(0);
  private confSupprSubject:Subject<number> = new Subject();
  private modifSubject:BehaviorSubject<T | undefined> = new BehaviorSubject<T | undefined>(undefined);
  private modifNotifSubject:Subject<number> = new Subject<number>();
  private asyncFormFieldsSubject:BehaviorSubject<Map<string, string[]>> = new BehaviorSubject<Map<string, string[]>>(new Map<string, string[]>())
  private confModifSubject:Subject<T> = new Subject();
  private creationSubject:Subject<boolean> = new Subject();
  private confCreationSubject:Subject<any> = new Subject();

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
  public getAsyncFieldsSubscriptions(){
    return this.asyncFormFieldsSubject;
  }
}
