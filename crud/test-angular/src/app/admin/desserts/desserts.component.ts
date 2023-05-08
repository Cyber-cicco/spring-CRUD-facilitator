import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {FormObject} from "../../form-models/form-object";
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementPresentation} from "../../models/accompagnement-presentation";

@Component({
  selector: 'test-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> implements OnInit, OnDestroy{

  constructor(private dessertService:AccompagnementService, private mapper:BasicMapperService<Accompagnement, AccompagnementPresentation>, crud:CrudDataflowService) {
    super(crud);
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
