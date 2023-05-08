import {ValidatorFn} from "@angular/forms";
import {FormType} from "./form-type-enum";
import {FormOption} from "./form-option-enum";

export interface FormObject {
  value:string | string[] | Date | number | {name:string, nb:number}
  validators:ValidatorFn | ValidatorFn[] | undefined
  type:FormType
  options:FormOption[]
}
