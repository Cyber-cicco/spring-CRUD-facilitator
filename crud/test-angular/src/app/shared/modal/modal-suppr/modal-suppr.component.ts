import {Component, Inject, OnInit} from '@angular/core';
import {CrudDataflowService} from "../../../config/data/crud-dataflow.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {BaseEntity} from "../../../config/models/base-entity";
import {SupprFormData} from "../../../config/form-models/suppr-form-data";
import { BaseHandler } from 'src/app/config/providers/base-handler';

@Component({
  selector: 'sid-modal-suppr',
  templateUrl: './modal-suppr.component.html',
  styleUrls: ['./modal-suppr.component.scss']
})
export class ModalSupprComponent<T extends BaseEntity, D extends BaseEntity> implements OnInit{

  private entity?:T
  private service?:BaseHandler<T, D>;

  private crud?:CrudDataflowService<T, D>

  constructor(private dialog:MatDialog,  @Inject(MAT_DIALOG_DATA) public data: SupprFormData<T, D>) {}



  closeModal(sendNotification: boolean) {
    if (sendNotification && this.entity != undefined && this.crud != undefined) this.service?.handleFormSuppression(this.entity);
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    console.log(this.data)
    this.entity= this.data.entity;
    this.service = this.data.service;
    this.crud = this.data.crud;
  }
}
