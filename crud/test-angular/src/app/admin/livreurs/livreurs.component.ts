import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";
import {UtilisateurMapperService} from "../../mapper/utilisateur-mapper.service";
import {BaseAdmin} from "../../models/base-admin";
import {Utilisateur} from "../../models/utilisateur";
import {MatDialog} from "@angular/material/dialog";
import {UtilisateurDataflowService} from "../../data/utilisateur-dataflow.service";
import {LivreurService} from "../../providers/livreur.service";

@Component({
  selector: 'test-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent extends BaseAdmin<Utilisateur, UtilisateurPresentation>{

    constructor(public utilisateurService:LivreurService, public mapper:UtilisateurMapperService, crud:UtilisateurDataflowService, modalService:MatDialog) {
    super(crud, modalService);

  }
}
