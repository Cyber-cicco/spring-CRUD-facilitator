import { Injectable } from '@angular/core';
import {FormObject} from "../form-models/form-object";
import {Validators} from "@angular/forms";
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
    this.formMap.set('id', {options: ["readonly"], type: "number", validators: [Validators.required], value: ""})
      .set('nom', {options: [], type: "text", validators: [Validators.required, Validators.max(255)], value: ""})
      .set('typeAccompagnement', {options: [], type: "text", validators: [Validators.required], value: ""})
      .set('prix', {options: [], type: "number", validators:[Validators.required], value: ""})
      .set('prenom', {options: [], type: "text", validators:[Validators.required, Validators.max(255)], value: ""})
      .set('motDePasse', {options: [], type: "password", validators:[Validators.required], value: ""})
      .set('rue', {options: [], type: "text", validators:[Validators.required, Validators.max(255)], value: ""})
      .set('ville', {options: [], type: "text", validators:[Validators.required, Validators.max(255)], value: ""})
      .set('codePostal', {options: [], type: "text", validators:[Validators.required, Validators.max(255)], value: ""})
      .set('email', {options: [], type: "text", validators:[Validators.required, Validators.email], value: ""})
      .set('pate', {options: [], type: "radio", validators:[Validators.required], value: ""})
      .set('code', {options: ["readonly"], type: "text", validators:[Validators.required], value: ""})
      .set('categorie', {options: [], type: "text", validators:[Validators.required], value: ""})
      .set('version', {options: ["readonly"], type: "text", validators:[Validators.required], value: ""})
      .set('photo', {options: [], type: "text", validators:[], value: ""})
      .set('pizzas', {options: [], type: "multichoice", validators:[Validators.required], value: ""})
      .set('menus', {options: [], type: "multichoice", validators:[Validators.required], value: ""})
      .set('nomMagasin', {options: [], type: "text", validators:[Validators.required], value: ""})
      .set('emailLivreur', {options: [], type: "text", validators:[Validators.required, Validators.email], value: ""})
      .set('emailClient', {options: [], type: "text", validators:[Validators.required, Validators.email], value: ""})
      .set('toppingList', {options: [], type: "checkbox", validators:[], value: ""})
      .set('ingredientList', {options: [], type: "checkbox", validators:[], value: ""})
  }

  getMap(){
    return this.formMap;
  }
}
