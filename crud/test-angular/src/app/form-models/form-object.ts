import {ValidatorFn} from "@angular/forms";

export interface FormObject {
  value:string | string[] | Date | number
  validators:ValidatorFn | ValidatorFn[] | undefined
  type:string
  options:string[]
}
