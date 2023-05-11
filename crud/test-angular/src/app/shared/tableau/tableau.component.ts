import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalSupprComponent} from "../modal/modal-suppr/modal-suppr.component";
import {ComponentType} from "@angular/cdk/overlay";
import {BasicService} from "../../providers/basic-service";
import {ModalModifComponent} from "../modal/modal-modif/modal-modif.component";
import {BaseEntity} from "../../models/base-entity";
import {BasicMapperService} from "../../mapper/basic-mapper.service";

@Component({
  selector: 'test-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})

export class TableauComponent<T extends BaseEntity, D extends BaseEntity> implements OnChanges{
  entities:T[] = [];

  enTetes:string[] | undefined =[];

  presentationItems: string[][] = [];

  @Input() mapper?:BasicMapperService<T, D>
  @Input() service?:BasicService<T>
  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showDatas();
  }

  showDatas(){
    if(this.service != undefined){
      this.service.getAll().subscribe(value=>{
        value.forEach(e => this.entities.push(e));
        this.constructMap(this.entities);
      })
    }
  }

  constructMap(value:T[]) {
    if(this.mapper != undefined && value.length > 0){
      let tabEntities:D[] = value.map(e => this.mapper!.toPresentation(e))
      this.enTetes = this.mapper.toPresentationKeys(tabEntities[0]);
      for(let i = 0; i < value.length; i++){
        let items:string[] = [];
        for(let value of Object.values(tabEntities[i])){
          items.push(value);
        }
        this.presentationItems.push(items);
      }
    }
    console.log(this.presentationItems);
  }

  sendSupprNotification(id: string | undefined) {
    if(id != undefined && this.service != undefined && !isNaN(Number(id))){
      this.openDialog(ModalSupprComponent, '1', '1');
    } else {
      throw "Erreur :  l'élément dans le tableau semble ne pas contenir d'id";
    }
  }

  openDialog(component:ComponentType<unknown>, enterAnimation:string, exitAnimation:string){
    this.dialog.open(component, {
      width:'550px',
      enterAnimationDuration:enterAnimation,
      exitAnimationDuration:exitAnimation,
      data : {
        service:this.service,
        entity:this.enTetes,
      }
    })
  }

  openForm(id:string|undefined){
    if(id != undefined && !isNaN(Number(id)) && this.service != undefined){
      this.openDialog(ModalModifComponent, "1", "1");
    } else {
      throw "Erreur, la ligne du tableau semble ne pas posséder d'identifiant, ou la subsciption n'est pas initialisée";
    }
  }
}
