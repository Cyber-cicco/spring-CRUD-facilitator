import {Component, Input} from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {BasicService} from "../../../providers/basic-service";

@Component({
  selector: 'test-modal-suppr',
  templateUrl: './modal-suppr.component.html',
  styleUrls: ['./modal-suppr.component.scss']
})
export class ModalSupprComponent<T> {

  private id = 0;
  @Input() service?:BasicService<T>;

  constructor(private dialog:MatDialog) {
  }


  closeModal(sendNotification: boolean) {
    if (sendNotification) this.service?.deleteById(String(this.id));
    this.dialog.closeAll();
  }
}
