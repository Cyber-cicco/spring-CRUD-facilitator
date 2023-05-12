import { Injectable } from '@angular/core';
import {BasicMapperService} from "./basic-mapper.service";
import {MapperService} from "./mapper.service";
import {Menu} from "../models/menu";
import {MenuPresentation} from "../models/menu-presentation";
import {FormMapperService} from "./form-mapper.service";
import {TransferFormObject} from "../models/transfer-form-object";
import {FormMenu} from "../form-models/form-menu";

@Injectable({
  providedIn: 'root'
})
export class MenuMapperService extends BasicMapperService<Menu, MenuPresentation>{

  constructor(mapper:MapperService, formMapper: FormMapperService) {
    super(mapper, formMapper);
  }

  toPresentation(menu: Menu):MenuPresentation {
    return {
      id:menu.id,
      prix:menu.prix,
      nom:menu.nom,
      accompagnements: menu.accompagnementList.map(val=>val.nom).join(', '),
      pizzas:menu.pizzaList.map(val=>val.nom).join(', ')
    }
  }

  override toFormMap(menu: Menu): TransferFormObject[] {
    let formMenu:FormMenu = {
      id: menu.id,
      nom: menu.nom,
      photo: menu.photo,
      description: menu.description,
      prix: menu.prix,
      pizzaList: menu.pizzaList?.map(p=>p.nom) ?? [],
      encas: menu.accompagnementList?.filter(a => a.typeAccompagnement == "ENCAS")[0]?.nom ?? [],
      dessert: menu.accompagnementList?.filter(a => a.typeAccompagnement == "DESSERT")[0]?.nom ?? [],
      boisson: menu.accompagnementList?.filter(a => a.typeAccompagnement == "BOISSON")[0]?.nom ?? [],
    }
    return super.toFormMap(formMenu);
  }
  override fromFormToEntity(form: any): Menu {
    return {
      accompagnementList: [form.boisson, form.encas, form.dessert].filter(value => value != null && true && value != ""),
      description: form.description,
      id: form.id,
      nom: form.nom,
      photo: form.photo,
      pizzaList: form.pizzaList.map((p:any)=>{return {libelle:p}}),
      prix: form.prix}
  }
}
