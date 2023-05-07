import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilisateurService} from "../../providers/utilisateur.service";
import {UtilisateurPresentation} from "../../models/utilisateur-presentation";
import {UtilisateurMapperService} from "../../mapper/utilisateur-mapper.service";
import {BaseAdmin} from "../../models/base-admin";
import {Utilisateur} from "../../models/utilisateur";
import {CrudDataflowService} from "../../data/crud-dataflow.service";

@Component({
  selector: 'test-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent extends BaseAdmin implements OnInit, OnDestroy{

    constructor(private utilisateurService:UtilisateurService, mapper:UtilisateurMapperService, crud:CrudDataflowService) {
    super(crud);
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
      this.items = mapper.toPresentationKeys(utilisateursPresentation);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe((id:number)=>{
      this.utilisateurService.deleteById(String(id));
    },
      (id:number)=>{},
      ()=>{});
  }
}
