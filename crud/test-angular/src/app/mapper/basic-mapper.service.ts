import { Injectable } from '@angular/core';
import {MapperService} from "./mapper.service";
import {FormObject} from "../form-models/form-object";
import {Validators} from "@angular/forms";
import {FormMapperService} from "./form-mapper.service";

/**
 * Classe servant à transformer les objets récupérés du back en objets permettant de les
 * afficher de façon formatée spécialement pour le front.
 * @param T :L'entité récupérée par l'appel HTTP, avec des champs que l'on ne souhaite pas forcément
 * afficher ou mal formaté.
 * @param D :L'entité dont les champs ont été formatés pour correspondre aux besoins d'affichage du
 * tableau
 * */
@Injectable({
  providedIn: 'root'
})
export class BasicMapperService<T extends Object, D extends Object> {

  constructor(private mapper:MapperService, private formMapper:FormMapperService) {}
  /**
   * Permet de transformer les clés de l'objet à afficher en clés
   * présentables pour l'en tête du tableau
   * @items = les objets à afficher dans le tableau, avec leurs clés non adaptées à l'affichage
   * */
  toPresentationKeys(items:D[] | T[]):Map<string, string>[]{
    let mapArray:Map<string,string>[] = [];
    for(let item of items){
      let map = new Map<string, string>();
      for(let [key, value] of Object.entries(item)){
        map.set((this.mapper.mapChamps.has(key)) ? this.mapper.mapChamps.get(key)! : key, value)
      }
      mapArray.push(map);
    }
    return mapArray;
  }

  /**
   * Permet de transformer les entités en Map permettant de remplir le formulaire
   * des champs nécessaires à la création ou au changement d'une entité
   * @param entity :l'entité
   * */
  toFormMap(entity: T) {
    let newMap = new Map<string, FormObject>();
    for(let [key, value] of Object.entries(entity)){
      let formObject:FormObject = this.formMapper.getMap().get(key) ?? {options: [], type: "text", validators:[Validators.required], value:""};
      formObject.value = value;
      newMap.set(key, formObject);
    }
    return newMap
  }
}

