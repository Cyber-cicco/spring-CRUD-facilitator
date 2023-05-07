import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";
import {CrudDataflowService} from "../../data/crud-dataflow.service";

@Component({
  selector: 'test-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent extends BaseAdmin implements OnInit, OnDestroy{
  constructor(private boissonService: AccompagnementService, private mapper: BasicMapperService, crud: CrudDataflowService) {
    super(crud);
    this.boissonService.getAllBoissons().subscribe((value) => {
      this.constructMap(value, mapper);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe((id:number)=>{
      this.boissonService.deleteById(String(id));
    },
      (id:number)=>{},
      ()=>{});
  }
}
