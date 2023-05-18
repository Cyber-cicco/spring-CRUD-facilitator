import {Injectable} from '@angular/core';
import {MapperService} from "./mapper.service";
import {Validators} from "@angular/forms";
import {FormMapperService} from "./form-mapper.service";
import {TransferFormObject} from "../form-models/transfer-form-object";
import {FormType} from "../form-models/form-type-enum";
import { BaseEntity } from '../models/base-entity';
import { BaseTabEntity } from '../models/base-tab-entity';

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
export abstract class BasicMapperService<T extends BaseEntity, D extends BaseTabEntity> {

  constructor(private mapper:MapperService, protected formMapper:FormMapperService) {}
  /**
   * Permet de transformer les clés de l'objet à afficher en clés
   * présentables pour l'en tête du tableau
   * @items = un des objets à afficher dans le tableau, avec ses clés non adaptées à l'affichage
   * */
  toPresentationKeys(items:D | T):string[]{
    let keys:string[] = [];
    for(let key  of Object.keys(items)){
      keys.push(this.changeNameToPretty(key))
    }
    return keys;
  }

  /**
   * Permet de transformer le nom d'un paramètre de l'entité en son nom affiché dans le tableau.
   * */
  public changeNameToPretty(name:string){
    return (this.mapper.mapChamps.has(name)) ? this.mapper.mapChamps.get(name)! : name[0].toUpperCase() + name.substring(1)
  }

  /**
   * Permet de transformer les entités en tableau d'objets permettant de remplir le formulaire
   * des champs nécessaires à la création ou au changement d'une entité. Inclue ses validateurs
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
      return newMap
    }
   throw "Error: entity is undefined";
  }

  /**Permet de transformer l'entité en une entité à présenter dans le tableau*/
  abstract toPresentation(entity:T):D

  /**
   * Permet de passer de l'objet récupéré du formulaire à l'entité. Est pour le moment en any, mais mériterait d'avoir
   * un système robuste de vérification de l'intégrité de l'entité
   * */
  abstract fromFormToEntity(form:any):T
}

