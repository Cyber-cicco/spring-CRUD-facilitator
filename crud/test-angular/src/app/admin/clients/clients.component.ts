import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";
import {BaseAdmin} from "../../models/base-admin";
import {UtilisateurMapperService} from "../../mapper/utilisateur-mapper.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";
import {MatDialog} from "@angular/material/dialog";
import {ClientDataflowService} from "../../data/client-dataflow.service";

@Component({
  selector: 'test-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent extends BaseAdmin<Utilisateur, UtilisateurPresentation> {

  constructor(public utilisateurService:UtilisateurService, public mapper:UtilisateurMapperService, crud:ClientDataflowService, modalService:MatDialog) {
    super(crud, modalService);
  }
}
