import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";
import {UtilisateurMapperService} from "../../mapper/utilisateur-mapper.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";
import {BaseAdmin} from "../../models/base-admin";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'test-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent extends BaseAdmin<Utilisateur, UtilisateurPresentation> implements OnInit, OnDestroy{

  constructor(private utilisateurService:UtilisateurService,
              private mapper:UtilisateurMapperService,
              crud:CrudDataflowService,
              modalService:MatDialog) {
    super(crud,modalService);
  }

  override constructMap(value: Utilisateur[], mapper: UtilisateurMapperService) {
    let utilisateursPresentation:UtilisateurPresentation[] = [];
    for (let utilisateur of value){
      utilisateursPresentation.push(mapper.toUtilisateurPresentation(utilisateur));
    }
    if (utilisateursPresentation[0] != undefined) {
      this.items = mapper.toPresentationKeys(utilisateursPresentation);

    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe(this.utilisateurService, this.mapper);
    this.showDatas(this.utilisateurService, this.mapper);
  }
}
