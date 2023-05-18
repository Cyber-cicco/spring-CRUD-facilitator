import {Component} from '@angular/core';
import {BaseAdmin} from "../../config/models/base-admin";
import {Commande} from "../../config/models/commande";
import {CommandePresentation} from "./models/commande-presentation";
import { CommandeHandlerService } from './providers/liveur-handler.service';
import {CommandeMapperService} from "./mapper/commande-mapper.service";
import {CommandeDataflowService} from "./data/commande-dataflow.service";
import {MenuService} from "../../config/providers/menu.service";
import {PizzaService} from "../../config/providers/pizza.service";
import {MagasinService} from "../../config/providers/magasin.service";
import {map, Observable} from "rxjs";
import {Status} from "./enum/status-enum";

@Component({
  selector: 'test-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent extends BaseAdmin<Commande, CommandePresentation> {

  constructor(public commandeService:CommandeHandlerService, public mapper:CommandeMapperService, crud:CommandeDataflowService, private menuService:MenuService, private pizzaService:PizzaService, private magasinService:MagasinService) {
    super(crud, commandeService);
  }

  ngOnInit(): void {
    let fieldMap = new Map<string,string[]>();
    new Observable((observer)=>{
      this.magasinService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(("magasin"), value));
      this.pizzaService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(("commandePizzaList"), value));
      this.menuService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(("commandeMenuList"), value));
      observer.next("done");
    }).subscribe(()=>{
      fieldMap.set(this.mapper.changeNameToPretty('status'), [Status.ANNULEE, Status.ENCOURS, Status.ENREGISTREE, Status.PREPARATION, Status.TERMINEE]);
      this.crud.getAsyncFieldsSubscriptions().next(fieldMap)
    })
  }

}
