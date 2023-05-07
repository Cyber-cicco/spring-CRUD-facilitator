import { Component } from '@angular/core';
import {Commande} from "../../models/commande";
import {CommandeService} from "../../providers/commande.service";

@Component({
  selector: 'test-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent {

  items:Commande[] = [];

  constructor(private commandeService:CommandeService) {
    this.commandeService.getAll().subscribe((value)=>{
      this.items = value;
    })
  }
}
