import {Injectable} from '@angular/core';
import {FormObject} from "../form-models/form-object";
import {Validators} from "@angular/forms";
import {FormType} from "../form-models/form-type-enum";
import {FormOption} from "../form-models/form-option-enum";

/**
 * Classe permettant  la construction des champs du formulaire de création / modification d'une entité
 * */
@Injectable({
  providedIn: 'root'
})
export class FormMapperService {

  /**Map permettant de déterminer le contenu d'un champ en fonction de la clé d'un objet*/
  private formMap = new Map<string, FormObject>()
  /**
   * Dans cette map doivent se trouver les différentes options de chaque nom de champ, si l'on souhaite utiliser
   * cette map généraliste.
   * Si l'on ne souhaite pas passer par cette map pour déterminer les types de champ et les validateurs, il faut
   * override la méthode toFormMap dans le mapper associé à l'entité.
   * format général : .set(<nom-du-champ>, {options:[<enums-options>], type:<enum-type>, validators<validateurs>, value:"")
   * */
  constructor() {
    this.formMap.set('id', {options: [FormOption.READONLY], type: FormType.NUMBER, validators: [Validators.required], value: ""})
      .set('nom', {options: [], type: FormType.TEXT, validators: [Validators.required, Validators.max(255)], value: ""})
      .set('typeAccompagnement', {options: [], type: FormType.TEXT, validators: [Validators.required], value: ""})
      .set('prix', {options: [], type: FormType.NUMBER, validators:[Validators.required], value: ""})
      .set('prenom', {options: [], type: FormType.TEXT, validators:[Validators.required, Validators.max(255)], value: ""})
      .set('motDePasse', {options: [], type: FormType.PASSWORD, validators:[Validators.required], value: ""})
      .set('rue', {options: [], type: FormType.TEXT, validators:[Validators.required, Validators.max(255)], value: ""})
      .set('ville', {options: [], type: FormType.TEXT, validators:[Validators.required, Validators.max(255)], value: ""})
      .set('codePostal', {options: [], type: FormType.TEXT, validators:[Validators.required, Validators.max(255)], value: ""})
      .set('email', {options: [], type: FormType.TEXT, validators:[Validators.required, Validators.email], value: ""})
      .set('pate', {options: [], type: FormType.RADIO, validators:[Validators.required], value: ""})
      .set('code', {options: [FormOption.READONLY], type: FormType.TEXT, validators:[Validators.required], value: ""})
      .set('categorie', {options: [], type: FormType.SELECT, validators:[Validators.required], value: ""})
      .set('version', {options: [FormOption.READONLY], type: FormType.NUMBER, validators:[Validators.required], value: ""})
      .set('photo', {options: [], type: FormType.TEXT, validators:[], value: ""})
      .set('pizzas', {options: [], type: FormType.TEXT, validators:[Validators.required], value: ""})
      .set('menus', {options: [], type: FormType.TEXT, validators:[Validators.required], value: ""})
      .set('nomMagasin', {options: [], type: FormType.TEXT, validators:[Validators.required], value: ""})
      .set('emailLivreur', {options: [], type: FormType.TEXT, validators:[Validators.required, Validators.email], value: ""})
      .set('emailClient', {options: [], type: FormType.TEXT, validators:[Validators.required, Validators.email], value: ""})
      .set('toppingList', {options: [], type: FormType.CHECKBOX, validators:[], value: ""})
      .set('ingredientList', {options: [], type: FormType.CHECKBOX, validators:[], value: ""})
      .set('commandeMenuList', {options: [], type: FormType.MULTICHOICE, validators:[Validators.min(0)], value: ""})
      .set('commandePizzaList', {options: [], type: FormType.MULTICHOICE, validators:[Validators.min(0)], value: ""})
      .set('status', {options: [], type: FormType.SELECT, validators:[Validators.required], value: ""})
      .set('dateCommande', {options: [FormOption.READONLY], type: FormType.DATE, validators:[Validators.required], value: ""})
      .set('dessert', {options: [], type: FormType.RADIO, validators:[Validators.required], value: ""})
      .set('boisson', {options: [], type: FormType.RADIO, validators:[Validators.required], value: ""})
      .set('encas', {options: [], type: FormType.RADIO, validators:[Validators.required], value: ""})
      .set('pizzaList', {options: [], type: FormType.RADIO, validators:[Validators.required], value: ""})
      .set('', {options: [], type: FormType.SELECT, validators:[Validators.required], value: ""})
  }

  getMap(){
    return this.formMap;
  }
}
