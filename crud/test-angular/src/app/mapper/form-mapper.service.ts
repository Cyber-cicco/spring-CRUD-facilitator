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
      .set('toppingList', {options: [], type: FormType.TEXT, validators:[], value: ""})
      .set('ingredientList', {options: [], type: FormType.TEXT, validators:[], value: ""})
  }

  getMap(){
    return this.formMap;
  }
}
