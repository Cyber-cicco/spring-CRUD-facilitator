import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {FormObject} from "../../form-models/form-object";
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementPresentation} from "../../models/accompagnement-presentation";

@Component({
  selector: 'test-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> implements OnInit, OnDestroy{
  constructor(private boissonService: AccompagnementService, private mapper: BasicMapperService<Accompagnement, AccompagnementPresentation>, crud: CrudDataflowService) {
    super(crud);
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
