import { Component } from '@angular/core';
import {Menu} from "../../models/menu";
import {MenuService} from "../../providers/menu.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";
import {MenuMapperService} from "../../mapper/menu-mapper.service";
import {MenuPresentation} from "../../models/menu-presentation";
import {BaseAdmin} from "../../models/base-admin";

@Component({
  selector: 'test-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent extends BaseAdmin{


  constructor(private menuService:MenuService, mapper:MenuMapperService) {
    super();
    this.menuService.getAll().subscribe((value)=>{

    })
  }
  override constructMap(value: Menu[], mapper: MenuMapperService) {
    let menuPresentation:MenuPresentation[] = [];
      for (let menu of value){
        menuPresentation.push(mapper.toMenuPresentation(menu));
      }
      if(menuPresentation[0] != undefined){
        this.items.push(mapper.toPresentationKeys(menuPresentation));
      }
  }
}
