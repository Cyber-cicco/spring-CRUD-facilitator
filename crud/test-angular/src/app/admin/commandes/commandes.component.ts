import {Component, OnDestroy, OnInit} from '@angular/core';
import {Commande} from "../../models/commande";
import {CommandeService} from "../../providers/commande.service";
import {BaseAdmin} from "../../models/base-admin";
import {CommandeMapperService} from "../../mapper/commande-mapper.service";
import {CommandePresentation} from "../../models/commande-presentation";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {map, Observable} from "rxjs";
import {Categorie} from "../../form-models/categorie-enum";
import {MenuService} from "../../providers/menu.service";
import {PizzaService} from "../../providers/pizza.service";
import {MagasinService} from "../../providers/magasin.service";
import {Status} from "../../form-models/status-enum";

@Component({
  selector: 'test-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent extends BaseAdmin<Commande, CommandePresentation> implements OnInit, OnDestroy{

  constructor(private commandeService:CommandeService, private mapper:CommandeMapperService, crud:CrudDataflowService, modalService:MatDialog, private menuService:MenuService, private pizzaService:PizzaService, private magasinService:MagasinService, ) {
    super(crud, modalService);
    this.commandeService.getAll().subscribe((value)=>{
      console.log("init")
      this.constructMap(value, mapper)
    })
  }
  override constructMap(value: Commande[], mapper: CommandeMapperService) {
    let commandePresentations:CommandePresentation[] = [];
    for (let commande of value){
      console.log(commande)
      commandePresentations.push(mapper.toCommandePresentation(commande));
    }
    if(commandePresentations[0] != undefined){
      this.items = mapper.toPresentationKeys(commandePresentations);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe(this.commandeService, this.mapper);
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
