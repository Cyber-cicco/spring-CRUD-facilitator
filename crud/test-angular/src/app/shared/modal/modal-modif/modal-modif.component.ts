import {Component, Inject, OnInit} from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TransferFormObject} from "../../../models/transfer-form-object";
import {Multichoice} from 'src/app/form-models/form-mutlichoice';
import {FormValue} from 'src/app/form-models/form-value';
import {BasicMapperService} from "../../../mapper/basic-mapper.service";
import {BaseEntity} from "../../../models/base-entity";
import {FormType} from "../../../form-models/form-type-enum";
import {FormOption} from "../../../form-models/form-option-enum";
import {BaseHandler} from "../../../providers/base-handler";

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

  handler:BaseHandler<T, D> | undefined

  boxValues:Map<string, Map<string,boolean>> = new Map();
  crud?:CrudDataflowService<T>

  service:BaseHandler<T, D> | undefined;

  multichoiceValues: Map<string, Map<string, number>> = new Map();

  inputValues : Map<string, FormValue | Multichoice[] | null> = new Map();


  constructor(private fb:FormBuilder,
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

    this.crud = this.data.crud;
    this.asyncFields = this.crud!.getAsyncFieldsSubscriptions().getValue();
    this.entity = this.data.entity;
    this.handler = this.data.handler;
    this.mapper = this.data.mapper;
    this.service = this.data.service;
    if(this.mapper != undefined){
      this.items = this.mapper?.toFormMap(this.entity)
      this.createFormFields()
    }

  }

  createFormFields(){
    let formGroupFields:any = {};
    for(let tfo of this.items!){
      console.log("début loop");
      if (tfo.form.type != FormType.MULTICHOICE && tfo.form.type != FormType.CHECKBOX){
        let control =new FormControl({value:tfo.form.value, disabled:tfo.form.options.includes(FormOption.READONLY)});
        if (tfo.form.validators != undefined) control.addValidators(tfo.form.validators);
        formGroupFields[tfo.name] = control;
        this.inputValues.set(tfo.name, tfo.form.value);


      } else if(tfo.form.value instanceof Array){
        if(tfo.form.type === FormType.CHECKBOX){
          console.log("checkbox")
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
            formGroupFields[option] = new FormControl(option);
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
    this.formModification = this.fb.group(formGroupFields);
  }

  /**Foncition appelée lors du clique sur un bouton fermant la modale
   * */
  closeModal(validated: boolean) {
    if(validated){
      let resutlObject:any = {}
        this.multichoiceValues.forEach((val, key) => {
          let multichoices:Multichoice[] = []
          for(let entry of val.entries()){
            multichoices.push({nom:entry[0], nb:entry[1]})
          }
          resutlObject[key] = multichoices;
        });

      for(let tfo of this.items){

        if ([FormType.RADIO, FormType.TEXT, FormType.PASSWORD, FormType.DATE, FormType.NUMBER].includes(tfo.form.type)){
            resutlObject[tfo.id] = this.formModification.controls[tfo.name]?.value

        } else if (tfo.form.type == FormType.CHECKBOX){

            let arraySult:string[] = []

            for(let subEntity of this.boxValues.get(tfo.name)!){
              if(subEntity[1]) arraySult.push(subEntity[0]);
            }

            resutlObject[tfo.id] = arraySult;

          } else if (tfo.form.type != FormType.MULTICHOICE) {

            resutlObject[tfo.id] = this.inputValues.get(tfo.name)!
          }
        }
        if(resutlObject.id != undefined){
          this.service!.handleModifications(this.mapper!.fromFormToEntity(resutlObject));
        } else {
          this.service!.handleAjout(this.mapper!.fromFormToEntity(resutlObject));
        }
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
