import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class CrudDataflowService<T> {

  private tabRowSubject:BehaviorSubject<T[] | undefined> = new BehaviorSubject<T[] | undefined>(undefined);
  private asyncFormFieldsSubject:BehaviorSubject<Map<string, string[]>> = new BehaviorSubject<Map<string, string[]>>(new Map<string, string[]>())

  public getAsyncFieldsSubscriptions(){
    return this.asyncFormFieldsSubject;
  }

  public getTabRowSubject(){
    return this.tabRowSubject;
  }
}
