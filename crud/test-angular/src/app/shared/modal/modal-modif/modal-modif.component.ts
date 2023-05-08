import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'test-modal-modif',
  templateUrl: './modal-modif.component.html',
  styleUrls: ['./modal-modif.component.scss']
})
export class ModalModifComponent implements OnInit, OnDestroy{

  items = new Map<string,string>();
  modifSubscription:Subscription = new Subscription();
  formModification: FormGroup;
  constructor(private crud:CrudDataflowService,
              private fb:FormBuilder,
              private modalService:MatDialog) {
    this.formModification = fb.group({
      tagrossemere:["", []]
    });
    this.formModification.valueChanges.subscribe((values)=>{
      console.log("changements vus")
      console.log(values)
    });

  }

  ngOnDestroy(): void {
    this.modifSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.modifSubscription = this.crud.getModifSubject().subscribe(value => {
      if(value != undefined){
        const formGroupFields:any = {};
        for(let key of value.keys()){
          formGroupFields[key] = new FormControl("");
        }
        this.formModification = this.fb.group(formGroupFields);
        this.items = value;

      }
    });
  }

  closeModal(validated: boolean) {
    this.modalService.closeAll();
  }
}
