import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalSupprComponent} from "../modal/modal-suppr/modal-suppr.component";
import {ComponentType} from "@angular/cdk/overlay";
import {BasicService} from "../../providers/basic-service";
import {ModalModifComponent} from "../modal/modal-modif/modal-modif.component";
import {BaseEntity} from "../../models/base-entity";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'test-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})

export class TableauComponent<T extends BaseEntity, D extends BaseEntity> implements OnInit, OnChanges{

  enTetes:string[] | undefined =[];

  presentationItems: string[][] = [];

  Tsubscription:Subscription = new Subscription();

  @Input() mapper?:BasicMapperService<T, D>
  @Input() service?:BasicService<T>
  @Input() crud?: CrudDataflowService<T>;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showDatas();
  }

  showDatas(){
    if(this.service != undefined && this.crud != undefined){
      this.Tsubscription = this.crud.getTabRowSubject().subscribe((value)=>{
        this.constructMap(value!);
      });
      this.service.getAll().subscribe(value=>{
        this.constructMap(value);
      })
    }
  }

  constructMap(value:T[]) {
    if(this.mapper != undefined && value.length > 0){
      this.presentationItems = [];
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
    this.dialog.open(ModalSupprComponent, {
      width:'550px',
      enterAnimationDuration:'1',
      exitAnimationDuration:'1',
      data : {
        service:this.service,
        id:id
      }
    })
    } else {
      throw "Erreur :  l'élément dans le tableau semble ne pas contenir d'id";
    }
  }

  openDialog(component:ComponentType<unknown>, enterAnimation:string, exitAnimation:string, id:string){

  }

  openForm(id:string|undefined){
    if(id != undefined && !isNaN(Number(id)) && this.service != undefined){
      this.service.getById(id).subscribe(value=>{
        this.dialog.open(ModalModifComponent, {
          width:'550px',
          enterAnimationDuration:'1',
          exitAnimationDuration:'1',
          data : {
            service:this.service,
            mapper:this.mapper,
            entity:value,
            crud:this.crud
          }
        })
      })
    } else {
      throw "Erreur, la ligne du tableau semble ne pas posséder d'identifiant, ou la subsciption n'est pas initialisée";
    }
  }
}
