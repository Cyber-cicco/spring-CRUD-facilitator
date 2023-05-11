import {Component, Inject, Input, OnInit} from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {BasicService} from "../../../providers/basic-service";

@Component({
  selector: 'test-modal-suppr',
  templateUrl: './modal-suppr.component.html',
  styleUrls: ['./modal-suppr.component.scss']
})
export class ModalSupprComponent<T> implements OnInit{

  private id = 0;
 private service?:BasicService<T>;

  constructor(private dialog:MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any, private crud:CrudDataflowService<T>) {
    console.log(this.data);
  }



  closeModal(sendNotification: boolean) {
    console.log(this.service == undefined)
    if (sendNotification) this.service?.deleteById(String(this.id)).subscribe(value=>
      this.service!.getAll().subscribe(value => {
        this.crud.getTabRowSubject().next(value);
      })
    );
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    console.log(this.data)
    this.id = this.data.id;
    this.service = this.data.service;
  }
}
