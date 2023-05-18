import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CrudDataflowService } from 'src/app/config/data/crud-dataflow.service';
import {MatDialog} from "@angular/material/dialog";
import {ModalSupprComponent} from "../modal/modal-suppr/modal-suppr.component";
import {ModalModifComponent} from "../modal/modal-modif/modal-modif.component";
import { BaseEntity } from 'src/app/config/models/base-entity';
import { BasicMapperService } from 'src/app/config/mapper/basic-mapper.service';
import {Subscription} from "rxjs";
import { BaseHandler } from 'src/app/config/providers/base-handler';
import { BaseTabEntity } from 'src/app/config/models/base-tab-entity';

@Component({
  selector: 'test-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})

export class TableauComponent<T extends BaseEntity, D extends BaseTabEntity> implements OnInit, OnChanges{

  enTetes:string[] | undefined =[];

  presentationItems: string[][] = [];

  Tsubscription:Subscription = new Subscription();

  @Input() mapper?:BasicMapperService<T, D>
  @Input() service?:BaseHandler<T, D>
  @Input() crud?: CrudDataflowService<T,D>;
  @Input() entites?: T[]
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log("in tableau");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillTableau(this.entites);
  }


  fillTableau(entites:T[]|undefined) {
    console.log("changing");
    if(this.mapper != undefined && entites != undefined && entites.length > 0){
      this.entites = entites;
      this.presentationItems = [];
      let tabEntities:D[] = entites.map(e => this.mapper!.toPresentation(e))
      if(this.enTetes?.length === 0) this.enTetes = this.mapper.toPresentationKeys(tabEntities[0]);
      if(this.entites[0].id != null){
        for(let i = 0; i < entites.length; i++){
          let items:string[] = [];
          for(let value of Object.values(tabEntities[i])){
            items.push(value);
          }
          this.presentationItems.push(items);
        }
      }
    }
  }

  sendSupprNotification(id: number| undefined) {
    if(id!= undefined && this.service != undefined && this.entites!= undefined){
      this.service.handleTabSuppression(this.entites[id]);
    } else {
      throw "Erreur :  l'élément dans le tableau semble ne pas contenir d'id";
    }
  }

  openForm(index:number){
    if(index!= undefined && this.service != undefined && this.entites!= undefined && this.mapper != undefined){
      this.service.handleTabModifications(this.entites[index]);
    } else {
      throw "Erreur, la ligne du tableau semble ne pas posséder d'identifiant, ou la subsciption n'est pas initialisée";
    }
  }
  openAjout(){
    if(this.service != undefined && this.entites != undefined && this.entites.length > 0){
      let mockEntity:any = {}
      for(let key of Object.keys(this.entites[0])){
        mockEntity[key] = null;
      }
      this.service.handleTabAjout(mockEntity);
    }
  }
}
