import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementPresentation} from "../../models/accompagnement-presentation";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'test-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> implements OnInit, OnDestroy{

  constructor(private dessertService:AccompagnementService, private mapper:BasicMapperService<Accompagnement, AccompagnementPresentation>, crud:CrudDataflowService, modalService:MatDialog) {
    super(crud, modalService);
    this.dessertService.getAllDessert().subscribe((value)=>{
      this.constructMap(value, mapper);
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe(this.dessertService, this.mapper);
  }
}
