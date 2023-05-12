import {Component} from '@angular/core';
import {BaseAdmin} from "../../models/base-admin";
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementPresentation} from "../../models/accompagnement-presentation";
import {MatDialog} from "@angular/material/dialog";
import {BoissonDataflowService} from "../../data/boisson-dataflow.service";
import {AccompagnementMapperService} from "../../mapper/accompagnement-mapper.service";
import {BoissonServiceService} from "../../providers/boisson-service.service";

@Component({
  selector: 'test-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> {
  constructor(public boissonService: BoissonServiceService, public mapper: AccompagnementMapperService, crud: BoissonDataflowService, modalService:MatDialog) {
    super(crud, modalService, boissonService);
  }
}
