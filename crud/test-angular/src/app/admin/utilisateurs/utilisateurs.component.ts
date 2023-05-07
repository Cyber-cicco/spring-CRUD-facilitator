import { Component } from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'test-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent {

  items:Utilisateur[] = [];

  constructor(private utilisateurService:UtilisateurService) {
    this.utilisateurService.getAll().subscribe((value)=>{
      this.items = value;
    })
  }
}
