import { Injectable } from '@angular/core';
import {MapperService} from "./mapper.service";
import {BasicMapperService} from "./basic-mapper.service";
import {FormMapperService} from "./form-mapper.service";
import {Magasin} from "../models/magasin";
import {MagasinPresentation} from "../models/magasin-presentation";

@Injectable({
  providedIn: 'root'
})
export class MagasinMapperService extends BasicMapperService<Magasin, MagasinPresentation>{


  constructor(mapper:MapperService, formMapper: FormMapperService) {
    super(mapper, formMapper);
  }

}
