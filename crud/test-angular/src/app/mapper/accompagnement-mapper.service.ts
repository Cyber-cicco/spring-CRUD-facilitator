import { Injectable } from '@angular/core';
import {BasicMapperService} from "./basic-mapper.service";
import {Accompagnement} from "../models/accompagnement";
import {MapperService} from "./mapper.service";
import {FormMapperService} from "./form-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class AccompagnementMapperService extends BasicMapperService<Accompagnement, Accompagnement> {

  constructor(mapper:MapperService, formMapper:FormMapperService ) {
    super(mapper, formMapper);
  }

  toPresentation(entity: Accompagnement): Accompagnement {
    return entity;
  }

  fromFormToEntity(form: Accompagnement): Accompagnement {
    return form;
  }
}
