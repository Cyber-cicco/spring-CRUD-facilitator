import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalSupprComponent} from "../modal/modal-suppr/modal-suppr.component";
import {ComponentType} from "@angular/cdk/overlay";
import {ModalModifComponent} from "../modal/modal-modif/modal-modif.component";

@Component({
  selector: 'test-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})

export class TableauComponent implements OnChanges{
  @Input() items:Map<string, string>[] = []

  constructor(private crud:CrudDataflowService, private dialog:MatDialog) {}

  sendSupprNotification(id: string | undefined) {
    if(id != undefined && !isNaN(Number(id))){
      this.crud.getSupprSubject().next(Number(id));
      this.openDialog(ModalSupprComponent, '1', '1');
    } else {
      throw "Erreur :  l'élément dans le tableau semble ne pas contenir d'id";
    }
  }

  openDialog(component:ComponentType<unknown>, enterAnimation:string, exitAnimation:string){
    this.dialog.open(component, {
      width:'350px',
      enterAnimationDuration:enterAnimation,
      exitAnimationDuration:exitAnimation
    })
  }

  openForm(id:string|undefined){
    if(id != undefined && !isNaN(Number(id))){
      this.crud.getModifSubject().next(Number(id));
      this.openDialog(ModalModifComponent, '1','1');
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
