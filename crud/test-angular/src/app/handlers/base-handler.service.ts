import { Injectable } from '@angular/core';
import {BaseEntity} from "../models/base-entity";
import {BasicService} from "../providers/basic-service";
import {BasicMapperService} from "../mapper/basic-mapper.service";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHandlerService<T extends BaseEntity, D extends BaseEntity> {

  protected constructor(protected service:BasicService<T>, protected mapper:BasicMapperService<T, D>) { }

  abstract handleModifications():void

}
