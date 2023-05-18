import {ValidatorFn} from "@angular/forms";
import {FormType} from "./form-type-enum";
import {FormOption} from "./form-option-enum";
import { MultiEntity } from "./form-mutlichoice";
import { FormValue } from "./form-value";

/**
 * Interface déterminant la structure que doit prendre une entité pour s'accorder avec ce que demande le formulaire.
 * prend une valeur, des validateurs, un type déterminé par l'énumérateur FormType, et un Array d'options déterminées
 * par l'énumérateur FormOption
 * */
export interface FormObject {
  value:FormValue | MultiEntity[] | null
  validators:ValidatorFn | ValidatorFn[] | undefined
  type:FormType
  options:FormOption[]
}
