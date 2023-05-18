import { Injectable } from '@angular/core';
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { CommandeDataflowService } from '../data/commande-dataflow.service';
import { HttpClient } from '@angular/common/http';
import {Commande} from "../../../config/models/commande";
import {CommandePresentation} from "../models/commande-presentation";
import {CommandeService} from "../../../config/providers/commande.service";
import {CommandeMapperService} from "../mapper/commande-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class CommandeHandlerService extends CommandeService implements BaseHandler<Commande, CommandePresentation>{

  constructor(http:HttpClient) {
    super(http)
  }

  /**Permet de gérer le bouton de modification du tableau*/
  handleTabModifications(entity:Commande){}
  /**Permet de gérer le bouton de supression du tableau*/
  handleTabSuppression(entity:Commande){}
  /**Permet de gérer le bouton d'ajout du tableau*/
  handleTabAjout(){}
  /**Permet de gérer le bouton de modification du formulaire*/
  handleFormModifications(entity:Commande){}
  /**Permet de gérer le bouton de supression du formulaire*/
  handleFormSuppression(entity:Commande){}
  /**Permet de gérer le bouton d'ajout du formulaire*/
  handleFormAjout(entity:Commande){}


}
