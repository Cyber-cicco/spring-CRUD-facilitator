import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementPresentation} from "../../models/accompagnement-presentation";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'test-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> implements OnInit, OnDestroy{
  constructor(private boissonService: AccompagnementService, private mapper: BasicMapperService<Accompagnement, AccompagnementPresentation>, crud: CrudDataflowService, modalService:MatDialog) {
    super(crud, modalService);
    this.boissonService.getAllBoissons().subscribe((value) => {
      this.constructMap(value, mapper);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe(this.boissonService, this.mapper);
  }
}
