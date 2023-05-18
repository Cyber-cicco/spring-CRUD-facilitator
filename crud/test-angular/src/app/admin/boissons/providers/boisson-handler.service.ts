import { Injectable } from '@angular/core';
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { Accompagnement } from 'src/app/config/models/accompagnement';
import { AccompagnementPresentation } from '../../boissons/models/accompagnement-presentation';
import { AccompagnementMapperService } from '../../boissons/mapper/accompagnement-mapper.service';
import { BoissonDataflowService } from '../data/boisson-dataflow.service';
import { AccompagnementService } from 'src/app/config/providers/accompagnement.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalModifComponent } from 'src/app/shared/modal/modal-modif/modal-modif.component';

@Injectable({
  providedIn: 'root'
})
export class BoissonHandlerService extends AccompagnementService implements BaseHandler<Accompagnement, AccompagnementPresentation>{

  constructor(http:HttpClient, private modalService:MatDialog, private mapper:AccompagnementMapperService, private crud:BoissonDataflowService) {
    super(http)
  }

  /**Permet de gérer le bouton de modification du tableau*/
  handleTabModifications(entity:Accompagnement){

    this.modalService.open(ModalModifComponent)
  }
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
