import {FormObject} from "./form-object";

/**
 * Interface permettant d'identifer les différents objets passés au formulaire
 * */
export interface TransferFormObject{
  id:string
  name:string,
  form:FormObject
}
