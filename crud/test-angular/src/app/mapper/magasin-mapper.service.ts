import { Injectable } from '@angular/core';
import {MapperService} from "./mapper.service";
import {BasicMapperService} from "./basic-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class MagasinMapperService extends BasicMapperService{


  constructor(mapper:MapperService) {
    super(mapper);
  }

}
