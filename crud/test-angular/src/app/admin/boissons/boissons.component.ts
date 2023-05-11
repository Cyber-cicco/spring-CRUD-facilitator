import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementPresentation} from "../../models/accompagnement-presentation";
import {MatDialog} from "@angular/material/dialog";
import {BoissonDataflowService} from "../../data/boisson-dataflow.service";

@Component({
  selector: 'test-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> {
  constructor(public boissonService: AccompagnementService, public mapper: BasicMapperService<Accompagnement, AccompagnementPresentation>, crud: BoissonDataflowService, modalService:MatDialog) {
    super(crud, modalService);
  }
}
