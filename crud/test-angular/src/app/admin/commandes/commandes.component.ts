import { Component } from '@angular/core';
import {Commande} from "../../models/commande";
import {CommandeService} from "../../providers/commande.service";
import {BaseAdmin} from "../../models/base-admin";
import {CommandeMapperService} from "../../mapper/commande-mapper.service";
import {CommandePresentation} from "../../models/commande-presentation";

@Component({
  selector: 'test-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent extends BaseAdmin{

  constructor(private commandeService:CommandeService, mapper:CommandeMapperService) {
    super();
    this.commandeService.getAll().subscribe((value)=>{
      this.constructMap(value, mapper)
    })
  }
  override constructMap(value: Commande[], mapper: CommandeMapperService) {
    let commandePresentations:CommandePresentation[] = [];
    for (let commande of value){
      commandePresentations.push(mapper.toCommandePresentation(commande));
    }
    if(commandePresentations[0] != undefined){
      this.items.push(mapper.toPresentationKeys(commandePresentations));
    }
  }
}
