import { Component } from '@angular/core';
import {Menu} from "../../models/menu";
import {MenuService} from "../../providers/menu.service";

@Component({
  selector: 'test-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent {

  items:Menu[] = [];

  constructor(private menuService:MenuService) {
    this.menuService.getAll().subscribe((value)=>{
      this.items = value;
    })
  }
}
