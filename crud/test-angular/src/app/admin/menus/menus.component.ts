import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from "../../models/menu";
import {MenuService} from "../../providers/menu.service";
import {MenuMapperService} from "../../mapper/menu-mapper.service";
import {MenuPresentation} from "../../models/menu-presentation";
import {BaseAdmin} from "../../models/base-admin";
import {MatDialog} from "@angular/material/dialog";
import {map, Observable} from "rxjs";
import {Status} from "../../form-models/status-enum";
import {AccompagnementService} from "../../providers/accompagnement.service";
import {PizzaService} from "../../providers/pizza.service";
import {TypeAccompagnement} from "../../form-models/type-accompagnement-enum";
import {MenuDataflowService} from "../../data/menu-dataflow.service";

@Component({
  selector: 'test-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent extends BaseAdmin<Menu, MenuPresentation> implements OnInit{


  constructor(public menuService:MenuService, public mapper:MenuMapperService, crud:MenuDataflowService, modalService:MatDialog, private accompagnementService:AccompagnementService, private pizzaService:PizzaService) {
    super(crud, modalService);
  }

  ngOnInit(): void {
    let fieldMap = new Map<string,string[]>();
    new Observable((observer)=>{
      this.pizzaService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(this.mapper.changeNameToPretty("pizzaList"), value));
      this.accompagnementService.getAll()
        .subscribe(value =>{
          let boissons:string[] = []
          let desserts:string[] = []
          let encas:string[] = []
          for(let acc of value){
            switch (acc.typeAccompagnement){
              case (TypeAccompagnement.BOISSON):
                 boissons.push(acc.nom);
                 break;
              case (TypeAccompagnement.DESSERT):
                desserts.push(acc.nom);
                break;
              default:
                encas.push(acc.nom);
            }
          }
          fieldMap.set(this.mapper.changeNameToPretty("boisson"), boissons);
          fieldMap.set(this.mapper.changeNameToPretty("dessert"), desserts);
          fieldMap.set(this.mapper.changeNameToPretty("encas"), encas);
        })
      observer.next("done");
    }).subscribe(()=>{
      fieldMap.set(this.mapper.changeNameToPretty('status'), [Status.ANNULEE, Status.ENCOURS, Status.ENREGISTREE, Status.PREPARATION, Status.TERMINEE]);
      this.crud.getAsyncFieldsSubscriptions().next(fieldMap)
    })
  }
}
