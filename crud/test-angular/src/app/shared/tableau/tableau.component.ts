import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalSupprComponent} from "../modal/modal-suppr/modal-suppr.component";
import {ModalModifComponent} from "../modal/modal-modif/modal-modif.component";
import {BaseEntity} from "../../models/base-entity";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {Subscription} from "rxjs";
import {BaseHandler} from "../../providers/base-handler";

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
  @Input() service?:BaseHandler<T, D>
  @Input() crud?: CrudDataflowService<T>;
  @Input() entites?: T[]
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillTableau(this.entites);
  }


  fillTableau(entites:T[]|undefined) {
    if(this.mapper != undefined && entites != undefined && entites.length > 0){
      this.entites = entites;
      this.presentationItems = [];
      let tabEntities:D[] = entites.map(e => this.mapper!.toPresentation(e))
      if(this.enTetes?.length ===0) this.enTetes = this.mapper.toPresentationKeys(tabEntities[0]);
      if(tabEntities[0].id != null){
        for(let i = 0; i < entites.length; i++){
          let items:string[] = [];
          for(let value of Object.values(tabEntities[i])){
            console.log(value);
            items.push(value);
          }
          this.presentationItems.push(items);
        }
      }
    }
  }

  sendSupprNotification(id: string | undefined) {
    if(id != undefined && this.service != undefined && !isNaN(Number(id))){
    this.dialog.open(ModalSupprComponent, {
      width:'550px',
      enterAnimationDuration:'1',
      exitAnimationDuration:'1',
      data : {
        service:this.service,
        id:id,
        crud:this.crud
      }
    })
    } else {
      throw "Erreur :  l'élément dans le tableau semble ne pas contenir d'id";
    }
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
            crud:this.crud,
          }
        })
      })
    } else {
      throw "Erreur, la ligne du tableau semble ne pas posséder d'identifiant, ou la subsciption n'est pas initialisée";
    }
  }
  openAjout(){
    if(this.service != undefined && this.entites != undefined && this.entites.length > 0){
      let mockEntity:any = {}
      console.log(this.entites[0]);
      for(let key of Object.keys(this.entites[0])){
        mockEntity[key] = null;
      }
      console.log(mockEntity);
      this.dialog.open(ModalModifComponent, {
        width:'550px',
        enterAnimationDuration:'1',
        exitAnimationDuration:'1',
        data : {
          service:this.service,
          mapper:this.mapper,
          entity:mockEntity,
          crud:this.crud,
        }
      })
    }
  }
}
