import {Component, OnInit} from '@angular/core';
import { Menu } from 'src/app/config/models/menu';
import { MenuHandlerService } from './providers/menu-handler.service';
import { MenuMapperService } from './mapper/menu-mapper.service';
import { MenuPresentation } from './models/menu-presentation';
import { BaseAdmin } from 'src/app/config/models/base-admin';
import {map, Observable} from "rxjs";
import { Status } from '../commandes/enum/status-enum';
import { AccompagnementService } from 'src/app/config/providers/accompagnement.service';
import { PizzaService } from 'src/app/config/providers/pizza.service';
import { TypeAccompagnement } from 'src/app/config/enums/type-accompagnement-enum';
import { MenuDataflowService } from './data/menu-dataflow.service';

@Component({
  selector: 'test-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent extends BaseAdmin<Menu, MenuPresentation> implements OnInit{


  constructor(public menuService:MenuHandlerService, public mapper:MenuMapperService, crud:MenuDataflowService, private accompagnementService:AccompagnementService, private pizzaService:PizzaService) {
    super(crud, menuService);
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
