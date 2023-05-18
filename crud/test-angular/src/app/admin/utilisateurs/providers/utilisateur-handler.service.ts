import { Injectable } from '@angular/core';
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { Utilisateur } from 'src/app/config/models/utilisateur';
import { UtilisateurPresentation } from '../../utilisateurs/models/utilisateur-presentation';
import { UtilisateurMapperService } from '../../utilisateurs/mapper/utilisateur-mapper.service';
import { UtilisateurDataflowService } from '../../utilisateurs/data/utilisateur-dataflow.service';
import { UtilisateurService } from 'src/app/config/providers/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurHandlerService extends UtilisateurService implements BaseHandler<Utilisateur, UtilisateurPresentation>{

  constructor(http:HttpClient, private dialog:MatDialog, private mapper:UtilisateurMapperService, private crud:UtilisateurDataflowService) {
    super(http)
  }

  /**Permet de gérer le bouton de modification du tableau*/
  handleTabModifications(entity:Utilisateur){}
  /**Permet de gérer le bouton de supression du tableau*/
  handleTabSuppression(entity:Utilisateur){}
  /**Permet de gérer le bouton d'ajout du tableau*/
  handleTabAjout(){}
  /**Permet de gérer le bouton de modification du formulaire*/
  handleFormModifications(entity:Utilisateur){}
  /**Permet de gérer le bouton de supression du formulaire*/
  handleFormSuppression(entity:Utilisateur){}
  /**Permet de gérer le bouton d'ajout du formulaire*/
  handleFormAjout(entity:Utilisateur){}


}
