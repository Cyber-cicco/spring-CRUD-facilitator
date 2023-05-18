import { Injectable } from '@angular/core';
import {MultiEntity} from "../config/form-models/form-mutlichoice";

@Injectable({
  providedIn: 'root'
})
export class TypeUtilsService {

  constructor() { }

  instanceOfMultichoice(object:Object):object is MultiEntity{
    return "nb" in object;
  }

  public instanceOfStringArray(object:Object):object is string[]{
    return object instanceof Array && object.length > 0 && typeof object[0] === typeof "";
  }

  public instanceOfDate(object:Object):object is Date{
    return object instanceof Date;
  }

  public instanceOfMultichoiceArray(object:Object):object is MultiEntity[]{
    return object instanceof Array && object.length > 0 && this.instanceOfMultichoice(object[0]) ;
  }

}
