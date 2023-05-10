import {ValidatorFn} from "@angular/forms";
import {FormType} from "./form-type-enum";
import {FormOption} from "./form-option-enum";
import { Multichoice } from "./form-mutlichoice";
import { FormValue } from "./form-value";

export interface FormObject {
  value:FormValue | Multichoice[]
  validators:ValidatorFn | ValidatorFn[] | undefined
  type:FormType
  options:FormOption[]
}
