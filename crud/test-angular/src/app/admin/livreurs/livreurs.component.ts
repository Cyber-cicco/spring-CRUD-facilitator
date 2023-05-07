import { Component } from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'test-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent {

  items:Utilisateur[] = [];

  constructor(private livreurService:UtilisateurService) {
    this.livreurService.getAllLivreurs().subscribe((value)=>{
      this.items = value;
    })
  }
}
