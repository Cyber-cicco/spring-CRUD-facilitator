import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";

@Component({
  selector: 'test-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent extends BaseAdmin implements OnInit, OnDestroy{

  constructor(private dessertService:AccompagnementService, mapper:BasicMapperService, crud:CrudDataflowService) {
    super(crud);
    this.dessertService.getAllDessert().subscribe((value)=>{
      this.constructMap(value, mapper);
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscsribe();
  }
}
