import { Injectable } from '@angular/core';
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { MenuPresentation } from '../models/menu-presentation';
import { Menu } from 'src/app/config/models/menu';
import { MenuMapperService } from '../mapper/menu-mapper.service';
import { MenuDataflowService } from '../data/menu-dataflow.service';
import { MenuService } from 'src/app/config/providers/menu.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MenuHandlerService extends MenuService implements BaseHandler<Menu, MenuPresentation>{

  constructor(http:HttpClient, private dialog:MatDialog, private mapper:MenuMapperService, private crud:MenuDataflowService) {
    super(http)
  }

  /**Permet de gérer le bouton de modification du tableau*/
  handleTabModifications(entity:Menu){}
  /**Permet de gérer le bouton de supression du tableau*/
  handleTabSuppression(entity:Menu){}
  /**Permet de gérer le bouton d'ajout du tableau*/
  handleTabAjout(){}
  /**Permet de gérer le bouton de modification du formulaire*/
  handleFormModifications(entity:Menu){}
  /**Permet de gérer le bouton de supression du formulaire*/
  handleFormSuppression(entity:Menu){}
  /**Permet de gérer le bouton d'ajout du formulaire*/
  handleFormAjout(entity:Menu){}


}
