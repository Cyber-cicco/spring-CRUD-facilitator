import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {TransferFormObject} from "../../../models/transfer-form-object";
import {FormOption} from "../../../form-models/form-option-enum";
import { FormType } from 'src/app/form-models/form-type-enum';
import { Multichoice } from 'src/app/form-models/form-mutlichoice';

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
  modifSubscription:Subscription = new Subscription();
  /**Fields du formulaire nécessitant d'être récupérés auprès de l'API*/
  asyncFields = new Map<string, string[]>();
  /**Formulaire*/
  formModification: FormGroup;
  checkBoxValues:Map<string, string[]> = new Map();
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
      console.log("subscription received");
      console.log(value);
      console.log(this.formModification);
      if(value != undefined){
        this.items = value;
        const formGroupFields:any = {};
        for(let tfo of value){
            if (tfo.form.type != FormType.MULTICHOICE){
              console.log("not in multichoice")
              console.log(tfo.name);
              let control =new FormControl({value:tfo.form.value, disabled:tfo.form.options.includes(FormOption.READONLY)});
              if (tfo.form.validators != undefined) control.addValidators(tfo.form.validators);
              formGroupFields[tfo.name] = control;
            } else if(tfo.form.value instanceof Array){
              console.log("in multichoice");
              for(let option of this.asyncFields.get(tfo.name)!){
                let control = new FormControl({});
                formGroupFields[option] = control;
                for(let multichoice of tfo.form.value){
                  console.log(tfo.form.value);
                  console.log(multichoice);
                  console.log(this.instanceOfMultichoice(multichoice));
                  if(this.instanceOfMultichoice(multichoice)){
                    console.log(multichoice.nom);
                    console.log(multichoice.nom === option);
                    if(multichoice.nom === option){
                      formGroupFields[option].value = multichoice.nb;
                    }
                  }
                }
              }
            }
        }
        this.formModification = this.fb.group(formGroupFields);
        console.log("modal-modif")
        console.log(this.formModification.controls);
        console.log(this.asyncFields);
      }
    });

  }
  /**Foncition appelée lors du clique sur un bouton fermant la modale
   * TODO: implémenter la création de la nouvelle map à partir des champs du formulaire
   * */
  closeModal(validated: boolean) {
    if(validated){
      console.log("modal moif validated");
      for(let [key, value] of Object.entries(this.formModification.controls)){
        console.log(key);
        console.log(value.value) ;
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
}
