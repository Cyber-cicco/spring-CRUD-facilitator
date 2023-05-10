import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {TransferFormObject} from "../../../models/transfer-form-object";
import {FormOption} from "../../../form-models/form-option-enum";
import { FormType } from 'src/app/form-models/form-type-enum';
import { Multichoice } from 'src/app/form-models/form-mutlichoice';
import { FormValue } from 'src/app/form-models/form-value';

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
export class ModalModifComponent implements OnInit, OnDestroy{

  /**Map des champs du formulaire et des ses propriétés*/
  items:TransferFormObject[] = [];

  /**Souscription à au sujet offrant les champs du formulaire à remplir*/
  private modifSubscription:Subscription = new Subscription();

  /**Fields du formulaire nécessitant d'être récupérés auprès de l'API*/
  asyncFields = new Map<string, string[]>();

  /**Formulaire*/
  formModification: FormGroup;

  boxValues:Map<string, Map<string,boolean>> = new Map();

  inputValues : Map<string, FormValue | Multichoice[]> = new Map();


  constructor(private crud:CrudDataflowService,
              private fb:FormBuilder,
              private modalService:MatDialog) {
    this.formModification = fb.group({});
  }

  ngOnDestroy(): void {
    this.modifSubscription.unsubscribe();
  }

  instanceOfMultichoice(object:Object):object is Multichoice{
    return "nb" in object;
  }

  /**Création des champs du formulaire*/
  ngOnInit(): void {

    this.asyncFields = this.crud.getAsyncFieldsSubscriptions().getValue()
    this.modifSubscription = this.crud.getModifSubject().subscribe(value => {

      if(value != undefined){

        this.items = value;
        const formGroupFields:any = {};

        for(let tfo of value){
            if (tfo.form.type != FormType.MULTICHOICE && tfo.form.type != FormType.CHECKBOX){

              let control =new FormControl({value:tfo.form.value, disabled:tfo.form.options.includes(FormOption.READONLY)});
              if (tfo.form.validators != undefined) control.addValidators(tfo.form.validators);
              formGroupFields[tfo.name] = control;
              this.inputValues.set(tfo.name, tfo.form.value);


            } else if(tfo.form.value instanceof Array){

              if(tfo.form.type === FormType.CHECKBOX && tfo.form.value instanceof Array){
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

                  for(let multichoice of tfo.form.value){
                    if(this.instanceOfMultichoice(multichoice)){
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
    });

  }
  /**Foncition appelée lors du clique sur un bouton fermant la modale
   * */
  closeModal(validated: boolean) {
    if(validated){

      console.log("modal moif validated");
      let mapResult = new Map<string, FormValue | Multichoice[]>();

      for(let tfo of this.items){

        if (![FormType.MULTICHOICE, FormType.CHECKBOX, FormType.RADIO, FormType.SELECT].includes(tfo.form.type)){
            mapResult.set(tfo.id, this.formModification.controls[tfo.name]?.value);

        } else if (tfo.form.type == FormType.CHECKBOX){

            let arraySult:string[] = []

            for(let subEntity of this.boxValues.get(tfo.name)!){
              if(subEntity[1]) arraySult.push(subEntity[0]);
            }

            mapResult.set(tfo.id, arraySult);
          } else {

            mapResult.set(tfo.id, this.inputValues.get(tfo.name)!);
          }
        }
        console.log(mapResult);
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
    console.log(this.boxValues);
  }

  addInputValues(field:string, value:string){
    this.inputValues.set(field, value);
  }

  addSelectValues(field:string ,$event:any){
    this.addInputValues(field, $event.target.value);
  }

}
