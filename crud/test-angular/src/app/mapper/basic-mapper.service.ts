import {Injectable} from '@angular/core';
import {MapperService} from "./mapper.service";
import {Validators} from "@angular/forms";
import {FormMapperService} from "./form-mapper.service";
import {TransferFormObject} from "../models/transfer-form-object";
import {FormType} from "../form-models/form-type-enum";
import { BaseEntity } from '../models/base-entity';

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
export abstract class BasicMapperService<T extends BaseEntity, D extends BaseEntity> {

  constructor(private mapper:MapperService, protected formMapper:FormMapperService) {}
  /**
   * Permet de transformer les clés de l'objet à afficher en clés
   * présentables pour l'en tête du tableau
   * @items = les objets à afficher dans le tableau, avec leurs clés non adaptées à l'affichage
   * */
  toPresentationKeys(items:D | T):string[]{
    let map:string[] = [];
    for(let key  of Object.keys(items)){
      map.push(this.changeNameToPretty(key))
    }
    return map;
  }

  public changeNameToPretty(name:string){
    return (this.mapper.mapChamps.has(name)) ? this.mapper.mapChamps.get(name)! : name[0].toUpperCase() + name.substring(1)
  }

  /**
   * Permet de transformer les entités en Map permettant de remplir le formulaire
   * des champs nécessaires à la création ou au changement d'une entité
   * @param entity :l'entité
   * */
  toFormMap(entity: Object | undefined):TransferFormObject[] {
    if(entity != undefined){
      let newMap:TransferFormObject[] = []
      for(let [key, value] of Object.entries(entity)){
        let transferFormObject:TransferFormObject = {
          id:key,
          name:this.changeNameToPretty(key),
          form:this.formMapper.getMap().get(key) ?? {options: [], type: FormType.TEXT, validators:[Validators.required], value:value}
        }
        transferFormObject.form.value = value;
        newMap.push(transferFormObject);
      }
      console.log("basic-mapper-service");
      console.log(newMap);
      return newMap
    }
   throw "Error: entity is undefined";
  }

  abstract toPresentation(entity:T):D
}

