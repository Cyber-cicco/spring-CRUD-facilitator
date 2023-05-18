import { Injectable } from '@angular/core';
import {BasicMapperService} from "../../../config/mapper/basic-mapper.service";
import {Accompagnement} from "../../../config/models/accompagnement";
import {AccompagnementPresentation} from "../models/accompagnement-presentation";
import {FormMapperService} from "../../../config/mapper/form-mapper.service";
import {MapperService} from "../../../config/mapper/mapper.service";

@Injectable({
  providedIn: 'root'
})
export class AccompagnementMapperService extends BasicMapperService<Accompagnement, AccompagnementPresentation> {

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
