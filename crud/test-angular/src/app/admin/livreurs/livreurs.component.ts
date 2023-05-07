import { Component } from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";
import {UtilisateurMapperService} from "../../mapper/utilisateur-mapper.service";
import {BaseAdmin} from "../../models/base-admin";
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'test-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent extends BaseAdmin{

    constructor(private utilisateurService:UtilisateurService, mapper:UtilisateurMapperService) {
    super();
    this.utilisateurService.getAllLivreurs().subscribe((value)=>{
      this.constructMap(value, mapper);

    })
  }
  override constructMap(value: Utilisateur[], mapper: UtilisateurMapperService) {
    let utilisateursPresentation:UtilisateurPresentation[] = [];
    for (let utilisateur of value){
      utilisateursPresentation.push(mapper.toUtilisateurPresentation(utilisateur));
    }
    if(utilisateursPresentation[0] != undefined){
      this.items.push(mapper.toPresentationKeys(utilisateursPresentation));
    }
  }
}
