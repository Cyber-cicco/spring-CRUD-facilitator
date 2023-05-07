import {Component, Input} from '@angular/core';
import {CrudDataflowService} from "../../data/crud-dataflow.service";

@Component({
  selector: 'test-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})

export class TableauComponent {

  @Input() items:Map<string, string>[] = []

  constructor(private crud:CrudDataflowService) {
  }
  sendSupprNotification(id: string | undefined) {
    if(id != undefined && !isNaN(Number(id))){
      this.crud.getSupprSubject().next(Number(id));
    } else {
      throw "Erreur :  l'élément dans le tableau semble ne pas contenir d'id";
    }
  }
}
