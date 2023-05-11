import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementPresentation} from "../../models/accompagnement-presentation";
import {MatDialog} from "@angular/material/dialog";
import {DessertDataflowService} from "../../data/dessert-dataflow.service";

@Component({
  selector: 'test-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> {

  constructor(public dessertService:AccompagnementService, public mapper:BasicMapperService<Accompagnement, AccompagnementPresentation>, crud:DessertDataflowService, modalService:MatDialog) {
    super(crud, modalService);
  }
}
