import { Component } from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";
import {BaseAdmin} from "../../models/base-admin";
import {UtilisateurMapperService} from "../../mapper/utilisateur-mapper.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";

@Component({
  selector: 'test-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent extends BaseAdmin{

  constructor(private utilisateurService:UtilisateurService, mapper:UtilisateurMapperService) {
    super();
    this.utilisateurService.getAllClients().subscribe((value)=>{
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
