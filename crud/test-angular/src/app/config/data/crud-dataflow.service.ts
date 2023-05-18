import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { BaseEntity } from '../models/base-entity';
import { BaseTabEntity } from '../models/base-tab-entity';
import { FormCrudService } from 'src/app/shared/modal/crud/form-crud.service';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudDataflowService<T extends BaseEntity, D extends BaseTabEntity> {

  constructor(public formCrud:FormCrudService<T,D>){}

  private tabRowSubject:BehaviorSubject<T[] | undefined> = new BehaviorSubject<T[] | undefined>(undefined);
  private asyncFormFieldsSubject:BehaviorSubject<Map<string, string[]>> = new BehaviorSubject<Map<string, string[]>>(new Map<string, string[]>())

  public getAsyncFieldsSubscriptions(){
    return this.asyncFormFieldsSubject;
  }

  public getTabRowSubject(){
    return this.tabRowSubject;
  }

}
