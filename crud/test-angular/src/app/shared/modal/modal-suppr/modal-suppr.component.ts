import { Component } from '@angular/core';
import {CrudDataflowService} from "../../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'test-modal-suppr',
  templateUrl: './modal-suppr.component.html',
  styleUrls: ['./modal-suppr.component.scss']
})
export class ModalSupprComponent {

  private id = 0;

  constructor(private dialog:MatDialog, private crud:CrudDataflowService) {
    this.id = this.crud.getSupprSubject().getValue();
  }


  closeModal(sendNotification: boolean) {
    if (sendNotification) this.crud.getConfSupprSubject().next(this.id);
    this.dialog.closeAll();
  }
}
