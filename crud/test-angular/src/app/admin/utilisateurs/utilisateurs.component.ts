import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";
import {UtilisateurMapperService} from "../../mapper/utilisateur-mapper.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";
import {BaseAdmin} from "../../models/base-admin";
import {CrudDataflowService} from "../../data/crud-dataflow.service";

@Component({
  selector: 'test-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent extends BaseAdmin implements OnInit, OnDestroy{

  constructor(private utilisateurService:UtilisateurService,
              mapper:UtilisateurMapperService,
              crud:CrudDataflowService) {
    super(crud);
    this.utilisateurService.getAll().subscribe((value)=>{
      this.constructMap(value, mapper);

    })

  }
  override constructMap(value: Utilisateur[], mapper: UtilisateurMapperService) {
    let utilisateursPresentation:UtilisateurPresentation[] = [];
    for (let utilisateur of value){
      utilisateursPresentation.push(mapper.toUtilisateurPresentation(utilisateur));
    }
    for(let utilisateur of utilisateursPresentation){
      this.items.push(mapper.toPresentationKeys(utilisateursPresentation));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscsribe();
  }
}
