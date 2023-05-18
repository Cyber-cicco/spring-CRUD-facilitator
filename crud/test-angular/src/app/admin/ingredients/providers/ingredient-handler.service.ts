import { Injectable } from '@angular/core';
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { Ingredient } from 'src/app/config/models/ingredient';
import { IngredientPresentation } from '../models/ingredient-presentation';
import { IngredientMapperService } from '../mapper/ingredient-mapper.service';
import { IngredientDataflowService } from '../data/ingredient-dataflow.service';
import { IngredientService } from 'src/app/config/providers/ingredient.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientHandlerService extends IngredientService implements BaseHandler<Ingredient, IngredientPresentation>{

  constructor(http:HttpClient, private mapper:IngredientMapperService, private crud:IngredientDataflowService) {
    super(http)
  }

  /**Permet de gérer le bouton de modification du tableau*/
  handleTabModifications(entity:Ingredient){}
  /**Permet de gérer le bouton de supression du tableau*/
  handleTabSuppression(entity:Ingredient){}
  /**Permet de gérer le bouton d'ajout du tableau*/
  handleTabAjout(){}
  /**Permet de gérer le bouton de modification du formulaire*/
  handleFormModifications(entity:Ingredient){}
  /**Permet de gérer le bouton de supression du formulaire*/
  handleFormSuppression(entity:Ingredient){}
  /**Permet de gérer le bouton d'ajout du formulaire*/
  handleFormAjout(entity:Ingredient){}


}
