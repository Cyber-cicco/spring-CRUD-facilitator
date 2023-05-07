import { Component } from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'test-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  items:Utilisateur[] = [];

  constructor(private utilisateurService:UtilisateurService) {
    this.utilisateurService.getAllClients().subscribe((value)=>{
      this.items = value;
    })
  }
}
