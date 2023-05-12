import {Component} from '@angular/core';
import {BaseAdmin} from "../../models/base-admin";
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementPresentation} from "../../models/accompagnement-presentation";
import {MatDialog} from "@angular/material/dialog";
import {DessertDataflowService} from "../../data/dessert-dataflow.service";
import {AccompagnementMapperService} from "../../mapper/accompagnement-mapper.service";
import {DessertService} from "../../providers/dessert.service";

@Component({
  selector: 'test-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> {

  constructor(public dessertService:DessertService, public mapper:AccompagnementMapperService, crud:DessertDataflowService, modalService:MatDialog) {
    super(crud, modalService, dessertService);
  }
}
