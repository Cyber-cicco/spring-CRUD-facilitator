import {Component} from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";
import {UtilisateurMapperService} from "../../mapper/utilisateur-mapper.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";
import {BaseAdmin} from "../../models/base-admin";
import {MatDialog} from "@angular/material/dialog";
import {UtilisateurDataflowService} from "../../data/utilisateur-dataflow.service";

@Component({
  selector: 'test-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent extends BaseAdmin<Utilisateur, UtilisateurPresentation> {

  constructor(public utilisateurService:UtilisateurService,
              public mapper:UtilisateurMapperService,
              crud:UtilisateurDataflowService,
              modalService:MatDialog) {
    super(crud,modalService, utilisateurService);
  }
}
