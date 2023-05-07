import { Injectable } from '@angular/core';
import {BasicMapperService} from "./basic-mapper.service";
import {MapperService} from "./mapper.service";
import {Menu} from "../models/menu";
import {MenuPresentation} from "../models/menu-presentation";

@Injectable({
  providedIn: 'root'
})
export class MenuMapperService extends BasicMapperService{

  constructor(mapper:MapperService) {
    super(mapper);
  }

  toMenuPresentation(menu: Menu):MenuPresentation {
    return {
      id:menu.id,
      prix:menu.prix,
      nom:menu.nom,
      accompagnements: (()=>{
        let res = ""
        menu.accompagnementList.forEach(val=>{
          res += val.nom
        })
        return res;
      })(),
      pizzas:(()=> {
        let res = ""
        menu.accompagnementList.forEach(val => {
          res += val.nom
        });
        return res;
      })()
    }
  }
}
