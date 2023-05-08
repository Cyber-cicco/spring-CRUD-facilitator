import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {TransferFormObject} from "../../../models/transfer-form-object";
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
export class ModalModifComponent implements OnInit, OnDestroy{

  /**Map des champs du formulaire et des ses propriétés*/
  items:TransferFormObject[] = [];
  /**Souscription à au sujet offrant les champs du formulaire à remplir*/
  modifSubscription:Subscription = new Subscription();
  /**Fields du formulaire nécessitant d'être récupérés auprès de l'API*/
  asyncFields = new Map<string, string[]>();
  /**Formulaire*/
  formModification: FormGroup;
  constructor(private crud:CrudDataflowService,
              private fb:FormBuilder,
              private modalService:MatDialog) {
    this.formModification = fb.group({});
  }

  ngOnDestroy(): void {
    this.modifSubscription.unsubscribe();
  }

  /**Création des champs du formulaire*/
  ngOnInit(): void {
    this.modifSubscription = this.crud.getModifSubject().subscribe(value => {
      if(value != undefined){
        this.items = value;
        const formGroupFields:any = {};
        for(let tfo of value){
          let control =new FormControl({value:tfo.form.value, disabled:tfo.form.options.includes(FormOption.READONLY)});
          if (tfo.form.validators != undefined) control.addValidators(tfo.form.validators);
          formGroupFields[tfo.name] = control;
        }
        this.formModification = this.fb.group(formGroupFields);
      }
    });
    this.asyncFields = this.crud.getAsyncFieldsSubscriptions().getValue()
    console.log(this.asyncFields);

  }
  /**Foncition appelée lors du clique sur un bouton fermant la modale
   * TODO: implémenter la création de la nouvelle map à partir des champs du formulaire
   * */
  closeModal(validated: boolean) {
    this.modalService.closeAll();
  }
}
