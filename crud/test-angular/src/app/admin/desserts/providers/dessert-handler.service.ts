import { Injectable } from '@angular/core';
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { Accompagnement } from 'src/app/config/models/accompagnement';
import { AccompagnementPresentation } from '../../boissons/models/accompagnement-presentation';
import { AccompagnementMapperService } from '../../boissons/mapper/accompagnement-mapper.service';
import { DessertDataflowService } from '../data/dessert-dataflow.service';
import { AccompagnementService } from 'src/app/config/providers/accompagnement.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DessertHandlerService extends AccompagnementService implements BaseHandler<Accompagnement, AccompagnementPresentation>{

  constructor(http:HttpClient) {
    super(http)
  }

  /**Permet de gérer le bouton de modification du tableau*/
  handleTabModifications(entity:Accompagnement){}
  /**Permet de gérer le bouton de supression du tableau*/
  handleTabSuppression(entity:Accompagnement){}
  /**Permet de gérer le bouton d'ajout du tableau*/
  handleTabAjout(){}
  /**Permet de gérer le bouton de modification du formulaire*/
  handleFormModifications(entity:Accompagnement){}
  /**Permet de gérer le bouton de supression du formulaire*/
  handleFormSuppression(entity:Accompagnement){}
  /**Permet de gérer le bouton d'ajout du formulaire*/
  handleFormAjout(entity:Accompagnement){}


}
