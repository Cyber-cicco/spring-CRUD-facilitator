import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from "../../models/menu";
import {MenuService} from "../../providers/menu.service";
import {MenuMapperService} from "../../mapper/menu-mapper.service";
import {MenuPresentation} from "../../models/menu-presentation";
import {BaseAdmin} from "../../models/base-admin";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'test-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent extends BaseAdmin<Menu, MenuPresentation> implements OnInit, OnDestroy{


  constructor(private menuService:MenuService, private mapper:MenuMapperService, crud:CrudDataflowService, modalService:MatDialog) {
    super(crud, modalService);
    this.menuService.getAll().subscribe((value)=>{
      this.constructMap(value, mapper);
    })
  }
  override constructMap(value: Menu[], mapper: MenuMapperService) {
    let menuPresentation:MenuPresentation[] = [];
      for (let menu of value){
        menuPresentation.push(mapper.toMenuPresentation(menu));
      }
      if(menuPresentation[0] != undefined){
        this.items = mapper.toPresentationKeys(menuPresentation);
      }
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe(this.menuService, this.mapper);
  }
}
