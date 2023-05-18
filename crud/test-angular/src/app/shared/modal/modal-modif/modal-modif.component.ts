import { Component, Inject, OnInit } from '@angular/core';
import { CrudDataflowService } from 'src/app/config/data/crud-dataflow.service';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { TransferFormObject } from "../../../config/form-models/transfer-form-object";
import { MultiEntity } from "src/app/config/form-models/form-mutlichoice"
import { FormValue } from 'src/app/config/form-models/form-value';
import { BasicMapperService } from "src/app/config/mapper/basic-mapper.service";
import {BaseEntity} from "src/app/config/models/base-entity";
import { FormType } from 'src/app/config/form-models/form-type-enum';
import { FormOption } from 'src/app/config/form-models/form-option-enum';
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { FormCrudService } from '../crud/form-crud.service';

/**
 * Modal permettant de récupérer les champs de l'entité qu'elle est censé créer / modifier
 * N'est pas rattaché à une entité particulière, récupère juste une map des champs à créer
 * et renvoie une map des champs modifiés au composant l'ayant appelé. Le composant gère ensuite
 * le fait d'envoyer la requête au bon point de l'API.
 * Dépend des
 * */
@Component({
  selector: 'sid-modal-modif',
  templateUrl: './modal-modif.component.html',
  styleUrls: ['./modal-modif.component.scss']
})
export class ModalModifComponent<T extends BaseEntity, D extends BaseEntity> implements OnInit {

  /**Map des champs du formulaire et des ses propriétés*/
  items:TransferFormObject[] = [];

  /**Fields du formulaire nécessitant d'être récupérés auprès de l'API*/
  asyncFields = new Map<string, string[]>();

  entity:T | undefined;

  /**Formulaire*/
  public formModification: FormGroup;

  mapper?:BasicMapperService<T, D>


  boxValues:Map<string, Map<string,boolean>> = new Map();
  crud?:CrudDataflowService<T, D>

  service?:BaseHandler<T, D>

  multiEntityValues: Map<string, Map<string, number>> = new Map();

  inputValues : Map<string, FormValue | MultiEntity[] | null> = new Map();


  constructor(private fb:FormBuilder,
              private modalService:MatDialog,
              private formCrud:FormCrudService<T,D>
  ) {
    this.formModification = new FormGroup({});
  }

  /**
   * Méthode permettant de déterminer le type d'un objet comme correspondant à MultiEntity
   * */
  instanceOfMultiEntity(object:Object):object is MultiEntity{
    return "nb" in object;
  }

  /**
   * Initialisation des différents éléments récupérés du tableau,
   * puis appel à la fonction de création des champs du formulaire*/
  ngOnInit(): void {

    this.formModification =  this.fb.group({});
    this.formCrud.getFormDataSUbject().subscribe((data)=>{
      if(data != undefined){
        console.log("in modal-modif");
        this.crud = data.crud;
        this.asyncFields = this.crud!.getAsyncFieldsSubscriptions().getValue();
        this.entity = data.entity;
        this.mapper = data.mapper;
        this.service = data.service;
        if(this.mapper != undefined){
          this.items = this.mapper?.toFormMap(this.entity)
          this.createFormFields()
        }
      }
    })

  }

  /**
   * Permet de créer les controles dans le cas standard, càd un cas où un champ de l'entité correspond à un controle
   * dans le formulaire. Prend en charge SELECT, PASSWORD, TEXT
   * */
  private createControlForStandardInput(tfo:TransferFormObject, formGroupFields:any){
    let control =new FormControl({value:tfo.form.value, disabled:tfo.form.options.includes(FormOption.READONLY)});
    if (tfo.form.validators != undefined) control.addValidators(tfo.form.validators);
    formGroupFields[tfo.id] = control;
    this.inputValues.set(tfo.id, tfo.form.value);

  }

  /**
   * Permet de créer les contrôles pour les checkbox.
   * Initialise une map à partir de fields dépendants de la base de données, et les valorise à vrai
   * si les valeurs présent dans le tfo correspondent à l'une des valeurs des fields récupérés dans la base
   * de données.
   * */
  private createControlForCheckbox(tfo:TransferFormObject, formGroupFields:any) {
    if(tfo.form.type === FormType.CHECKBOX && tfo.form.value instanceof Array) {
      let boxMap = new Map<string, boolean>();
      if (!this.asyncFields.has(tfo.id)) throw "Les valeurs possibles d'une checkbox n'ont pas été renseignées";
      for (let box of this.asyncFields.get(tfo.id)!) {
        if (box != null) {
          console.log(box);
          formGroupFields[box] = new FormControl();
          boxMap.set(box, false);
        } else {
          this.asyncFields.delete(tfo.id);
          return;
        }
      }
      for (let checkedBox of tfo.form.value) {
        boxMap.set(String(checkedBox), true);
      }
      this.boxValues.set(tfo.id, boxMap);

    }
  }


  /**
   * Méthode permettant de créer les contrôles du formulaire dans le cas où l'option correspond à "multichoix"
   * */
  private createControlMultiEntity(tfo:TransferFormObject, formGroupFields:any){
    for(let option of this.asyncFields.get(tfo.id)!){
      formGroupFields[option] = new FormControl(option);
      this.multiEntityValues.set(tfo.id, new Map<string, number>());
      if(tfo.form.value instanceof Array)
      for(let multiEntity of tfo.form.value!){
        if(this.instanceOfMultiEntity(multiEntity)){
          this.multiEntityValues.get(tfo.id)!.set(multiEntity.nom, multiEntity.nb);
          if(multiEntity.nom === option){
            formGroupFields[option].value = multiEntity.nb;
          }
        }
      }
    }
  }

  /**Fonction permettant de créer dynamiquement les différents champs du formulaire
   * TODO: Refacto pour créer des fonctions plus petites traitant chacune un cas particulier
   * TODO: Rajouter de la doc
   * */
  createFormFields(){
    let formGroupFields:any = {};
    for(let tfo of this.items!){
      if (tfo.form.type != FormType.MULTICHOICE && tfo.form.type != FormType.CHECKBOX){
        this.createControlForStandardInput(tfo, formGroupFields);
      } else if(tfo.form.value instanceof Array){
        this.createControlForCheckbox(tfo, formGroupFields);
      } else {
        this.createControlMultiEntity(tfo, formGroupFields);
      }
    }
    this.formModification = this.fb.group(formGroupFields);
  }

  /**Fonction appelée lors du clique sur un bouton fermant la modale
   * Crée l'objet à partir des champs et laisse ensuite le service
   * gérer la modification ou la création de l'objet.
   * */
  closeModal(validated: boolean) {
    if(validated){
      let resutlObject:any = {}
        this.multiEntityValues.forEach((val, key) => {
          let multiEntitys:MultiEntity[] = []
          for(let entry of val.entries()){
            multiEntitys.push({nom:entry[0], nb:entry[1]})
          }
          resutlObject[key] = multiEntitys;
        });

      for(let tfo of this.items){

        if ([FormType.RADIO, FormType.TEXT, FormType.PASSWORD, FormType.DATE, FormType.NUMBER].includes(tfo.form.type)){
            resutlObject[tfo.id] = this.formModification.controls[tfo.id]?.value

        } else if (tfo.form.type == FormType.CHECKBOX){

            let arraySult:string[] = []

            for(let subEntity of this.boxValues.get(tfo.id)!){
              if(subEntity[1]) arraySult.push(subEntity[0]);
            }

            resutlObject[tfo.id] = arraySult;

          } else if (tfo.form.type != FormType.MULTICHOICE) {

            resutlObject[tfo.id] = this.inputValues.get(tfo.name)!
          }
        }
        if(resutlObject.id != undefined){
          this.service!.handleFormModifications(this.mapper!.fromFormToEntity(resutlObject));
        } else {
          console.log(resutlObject);
          this.service!.handleFormAjout(this.mapper!.fromFormToEntity(resutlObject));
        }
      }
    this.modalService.closeAll();
  }

  /**
   * À la création du formulaire, permet d'autocompléter les checkbox en fonction  de la valeur de l'entité en cas de
   * modification de celle-ci. Est censé ne rien afficher dans le cas où l'on crée un nouvelle entité
   * */
  checkChecked(item:any | any[], option:string ) {
    if(item instanceof Array){
      return item.includes(option)
    }
    return item === option;
  }

  /**
   * Permet d'alimenter une map des valeurs possibles pour les checkbox
   * */
  addBoxValues(field:string, value:string){
    this.boxValues.get(field)!.set(value, !this.boxValues.get(field)!.get(value));
  }

  /**
   * Permet d'alimenter une map contenant toutes les inputs
   * TODO : remplacer par une alimentation de l'objet response, qui devrait être créée de façon globale
   * */
  addInputValues(field:string, value:string){
    this.inputValues.set(field, value);
  }

  /**
   * Permet d'alimenter une map permettant d'alimenter les fields multiEntity de l'objet
   * */
  addMultiEntityValues(field:string, name:string, value:any){
    this.multiEntityValues.get(field)!.set(name, Number(value));

  }

  /**
   * Change les inputs value en fonction de l'option choisie par un field select.
   * */
  addSelectValues(field:string ,$event:any){
    this.addInputValues(field, $event.target.value);
  }

}
