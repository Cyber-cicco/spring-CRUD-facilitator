import {BaseEntity} from "../models/base-entity";
import {BasicService} from "./basic-service";

export interface BaseHandler<T extends BaseEntity, D extends BaseEntity> extends BasicService<T>{
  handleModifications(form:T):void,
  handleAjout(form:T):void,

}
