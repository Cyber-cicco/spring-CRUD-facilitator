import { Injectable } from '@angular/core';
import { ModalModifComponent } from 'src/app/shared/modal/modal-modif/modal-modif.component';
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { PizzaPresentation } from '../models/pizza-presentation';
import { Pizza } from 'src/app/config/models/pizza';
import { PizzaMapperService } from '../mapper/pizza-mapper.service';
import { PizzaDataflowService } from '../data/pizza-dataflow.service';
import { PizzaService } from 'src/app/config/providers/pizza.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalSupprComponent } from 'src/app/shared/modal/modal-suppr/modal-suppr.component';
import { FormCrudService } from 'src/app/shared/modal/crud/form-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaHandlerService extends PizzaService implements BaseHandler<Pizza, PizzaPresentation>{

  constructor(http:HttpClient, private dialog:MatDialog, private mapper:PizzaMapperService, private formCrud:FormCrudService<Pizza, PizzaPresentation> ,private crud:PizzaDataflowService) {
    super(http)
  }

  /**Permet de gérer le bouton de modification du tableau*/
  handleTabModifications(entity:Pizza){
    this.formCrud.getFormDataSUbject().next({
      entity:entity,
      service:this,
      mapper:this.mapper,
      crud:this.crud
    });
    this.dialog.open(ModalModifComponent)
  }

  /**Permet de gérer le bouton de supression du tableau*/
  handleTabSuppression(entity:Pizza){
    this.dialog.open(ModalSupprComponent, {
      width:'550px',
      enterAnimationDuration:'1',
      exitAnimationDuration:'1',
      data : {
        entity:entity,
        crud:this.crud,
        service:this
      }
    })
  }

  /**Permet de gérer le bouton d'ajout du tableau*/
  handleTabAjout(entity:Pizza){
    this.handleTabModifications(entity);
  }
  /**Permet de gérer le bouton de modification du formulaire*/
  handleFormModifications(entity:Pizza){
    this.patchById(String(entity.id), entity).subscribe(()=>{
      this.getAll().subscribe(value=>{
        this.crud.getTabRowSubject().next(value);
      })
    })

  }

  /**Permet de gérer le bouton de supression du formulaire*/
  handleFormSuppression(entity:Pizza){
    this.deleteById(String(entity.id)).subscribe(()=>
      this.getAll().subscribe(value => {
        this.crud.getTabRowSubject().next(value);
      }));
  }

  /**Permet de gérer le bouton d'ajout du formulaire*/
  handleFormAjout(entity:Pizza){
    this.post(entity).subscribe(()=>{
      this.getAll().subscribe(value=>{
        this.crud.getTabRowSubject().next(value);
      })
    })
  }


}
