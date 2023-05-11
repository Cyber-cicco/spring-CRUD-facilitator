import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TransferFormObject} from "../../../models/transfer-form-object";
import { Multichoice } from 'src/app/form-models/form-mutlichoice';
import { FormValue } from 'src/app/form-models/form-value';
import {BasicMapperService} from "../../../mapper/basic-mapper.service";
import {BaseEntity} from "../../../models/base-entity";
import {FormType} from "../../../form-models/form-type-enum";
import {FormOption} from "../../../form-models/form-option-enum";

/**
 * Modal permettant de récupérer les champs de l'entité qu'elle est censé créer / modifier
 * N'est pas rattaché à une entité particulière, récupère juste une map des champs à créer
 * et renvoie une map des champs modifiés au composant l'ayant appelé. Le composant gère ensuite
 * le fait d'envoyer la requête au bon point de l'API.
 * */
@Component({
  selector: 'test-modal-modif',
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
  formModification: FormGroup;

  mapper:BasicMapperService<T, D> | undefined

  boxValues:Map<string, Map<string,boolean>> = new Map();

  multichoiceValues: Map<string, Map<string, number>> = new Map();

  inputValues : Map<string, FormValue | Multichoice[]> = new Map();


  constructor(private crud:CrudDataflowService<T>,
              private fb:FormBuilder,
              private modalService:MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formModification = fb.group({});
  }

  instanceOfMultichoice(object:Object):object is Multichoice{
    return "nb" in object;
  }

  /**Création des champs du formulaire*/
  ngOnInit(): void {

    this.asyncFields = this.crud.getAsyncFieldsSubscriptions().getValue()
    this.entity = this.data.entity
    this.mapper = this.data.mapper;
    if(this.mapper != undefined){
      this.items = this.mapper?.toFormMap(this.entity)
      this.createFormFields()
    }

  }

  createFormFields(){
    let formGroupFields:any = {};
    for(let tfo of this.items!){
      console.log(tfo);
      if (tfo.form.type != FormType.MULTICHOICE && tfo.form.type != FormType.CHECKBOX){
        let control =new FormControl({value:tfo.form.value, disabled:tfo.form.options.includes(FormOption.READONLY)});
        console.log(control);
        if (tfo.form.validators != undefined) control.addValidators(tfo.form.validators);
        formGroupFields[tfo.name] = control;
        this.inputValues.set(tfo.name, tfo.form.value);


      } else if(tfo.form.value instanceof Array){
        console.log(tfo);
        if(tfo.form.type === FormType.CHECKBOX){
          let boxMap = new Map<string,boolean>();
          if(!this.asyncFields.has(tfo.name)) throw "Les valeurs possibles d'une checkbox n'ont pas été renseignées";

          for(let box of this.asyncFields.get(tfo.name)!){
            formGroupFields[box] = new FormControl();
            boxMap.set(box, false);
          }

          for(let checkedBox of tfo.form.value){
            boxMap.set(String(checkedBox), true);

          }

          this.boxValues.set(tfo.name, boxMap);

        } else {
          for(let option of this.asyncFields.get(tfo.name)!){
            let control = new FormControl(option);
            formGroupFields[option] = control;
            this.multichoiceValues.set(tfo.id, new Map<string, number>());

            for(let multichoice of tfo.form.value){
              if(this.instanceOfMultichoice(multichoice)){
                this.multichoiceValues.get(tfo.id)!.set(multichoice.nom, multichoice.nb);
                if(multichoice.nom === option){
                  formGroupFields[option].value = multichoice.nb;
                }
              }
            }
          }
        }

      }
    }
    console.log(formGroupFields);
    this.formModification = this.fb.group(formGroupFields);
    console.log(this.formModification.controls)
  }

  /**Foncition appelée lors du clique sur un bouton fermant la modale
   * */
  closeModal(validated: boolean) {
    if(validated){

/*
      let mapResult = new Map<string, FormValue | Multichoice[]>();
        this.multichoiceValues.forEach((val, key) => {
          let multichoices:Multichoice[] = []
          for(let entry of val.entries()){
            multichoices.push({nom:entry[0], nb:entry[1]})
          }
          mapResult.set(key, multichoices);
        });

      for(let tfo of this.items){

        if ([FormType.TEXT, FormType.PASSWORD, FormType.DATE, FormType.NUMBER].includes(tfo.form.type)){
            mapResult.set(tfo.id, this.formModification.controls[tfo.name]?.value);

        } else if (tfo.form.type == FormType.CHECKBOX){

            let arraySult:string[] = []

            for(let subEntity of this.boxValues.get(tfo.name)!){
              if(subEntity[1]) arraySult.push(subEntity[0]);
            }

            mapResult.set(tfo.id, arraySult);

          } else if (tfo.form.type != FormType.MULTICHOICE) {

            mapResult.set(tfo.id, this.inputValues.get(tfo.name)!);
          }
        }
        console.log("map created from the form");
        console.log(mapResult);
        this.crud.getConfModifSubject().next(mapResult);
*/
      }
    this.modalService.closeAll();
  }

  checkChecked(item:any | any[], option:string ) {
    if(item instanceof Array){
      return item.includes(option)
    }
    return item === option;
  }

  addBoxValues(field:string, value:string){
    this.boxValues.get(field)!.set(value, !this.boxValues.get(field)!.get(value));
  }

  addInputValues(field:string, value:string){
    this.inputValues.set(field, value);
  }

  addMultichoiceValues(field:string, name:string, value:any){
    this.multichoiceValues.get(field)!.set(name, Number(value));

  }

  addSelectValues(field:string ,$event:any){
    this.addInputValues(field, $event.target.value);
  }

}
