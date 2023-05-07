import {Component, OnDestroy, OnInit} from '@angular/core';
import {Commande} from "../../models/commande";
import {CommandeService} from "../../providers/commande.service";
import {BaseAdmin} from "../../models/base-admin";
import {CommandeMapperService} from "../../mapper/commande-mapper.service";
import {CommandePresentation} from "../../models/commande-presentation";
import {CrudDataflowService} from "../../data/crud-dataflow.service";

@Component({
  selector: 'test-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent extends BaseAdmin implements OnInit, OnDestroy{

  constructor(private commandeService:CommandeService, mapper:CommandeMapperService, crud:CrudDataflowService) {
    super(crud);
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
      this.items = mapper.toPresentationKeys(commandePresentations);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe((id:number)=>{
      this.commandeService.deleteById(String(id));
    });
  }
}
