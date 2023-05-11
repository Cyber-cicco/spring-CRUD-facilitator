import {Component, OnDestroy, OnInit} from '@angular/core';
import {Commande} from "../../models/commande";
import {CommandeService} from "../../providers/commande.service";
import {BaseAdmin} from "../../models/base-admin";
import {CommandeMapperService} from "../../mapper/commande-mapper.service";
import {CommandePresentation} from "../../models/commande-presentation";
import {MatDialog} from "@angular/material/dialog";
import {map, Observable} from "rxjs";
import {MenuService} from "../../providers/menu.service";
import {PizzaService} from "../../providers/pizza.service";
import {MagasinService} from "../../providers/magasin.service";
import {Status} from "../../form-models/status-enum";
import {CommandeDataflowService} from "../../data/commande-dataflow.service";

@Component({
  selector: 'test-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent extends BaseAdmin<Commande, CommandePresentation> {

  constructor(public commandeService:CommandeService, public mapper:CommandeMapperService, crud:CommandeDataflowService, modalService:MatDialog, private menuService:MenuService, private pizzaService:PizzaService, private magasinService:MagasinService, ) {
    super(crud, modalService);
  }

  ngOnInit(): void {
    let fieldMap = new Map<string,string[]>();
    new Observable((observer)=>{
      this.magasinService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(this.mapper.changeNameToPretty("magasin"), value));
      this.pizzaService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(this.mapper.changeNameToPretty("commandePizzaList"), value));
      this.menuService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(this.mapper.changeNameToPretty("commandeMenuList"), value));
      observer.next("done");
    }).subscribe(()=>{
      fieldMap.set(this.mapper.changeNameToPretty('status'), [Status.ANNULEE, Status.ENCOURS, Status.ENREGISTREE, Status.PREPARATION, Status.TERMINEE]);
      this.crud.getAsyncFieldsSubscriptions().next(fieldMap)
    })
  }

}
