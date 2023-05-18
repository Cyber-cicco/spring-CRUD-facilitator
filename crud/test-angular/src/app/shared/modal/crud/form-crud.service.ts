import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormData } from 'src/app/config/form-models/form-data';
import { BaseEntity } from 'src/app/config/models/base-entity';
import { BaseTabEntity } from 'src/app/config/models/base-tab-entity';


@Injectable({
  providedIn: 'root'
})
export class FormCrudService<T extends BaseEntity,D extends BaseTabEntity> {

  private formDataSubject:BehaviorSubject<FormData<T,D> | undefined> = new BehaviorSubject<FormData<T,D> | undefined>(undefined);

  constructor() { }

  public getFormDataSUbject(){
    return this.formDataSubject;
  }
}
