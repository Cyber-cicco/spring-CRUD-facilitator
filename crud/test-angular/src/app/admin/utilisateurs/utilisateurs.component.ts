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
              private mapper:UtilisateurMapperService,
              crud:CrudDataflowService) {
    super(crud);
    this.showDatas();
  }

  showDatas(){
    this.utilisateurService.getAll().subscribe((value)=>{
      this.items = [];
      this.constructMap(value, this.mapper);
    })
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
    this.subscribe((id:number)=>{
      this.utilisateurService.deleteById(String(id)).subscribe(value=>{
        console.log(value);
        this.showDatas();
      });
    },
      (id:number)=>{},
      ()=>{});
  }
}
