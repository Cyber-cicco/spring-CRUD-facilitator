import {ValidatorFn} from "@angular/forms";
import {FormType} from "./form-type-enum";
import {FormOption} from "./form-option-enum";
import { Multichoice } from "./form-mutlichoice";

export interface FormObject {
  value:string | string[] | Date | number | Multichoice[]
  validators:ValidatorFn | ValidatorFn[] | undefined
  type:FormType
  options:FormOption[]
}
