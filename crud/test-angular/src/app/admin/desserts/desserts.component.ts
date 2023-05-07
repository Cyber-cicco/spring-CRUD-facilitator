import { Component } from '@angular/core';
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";

@Component({
  selector: 'test-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent extends BaseAdmin{


  constructor(private dessertService:AccompagnementService, mapper:BasicMapperService) {
    super();
    this.dessertService.getAllDessert().subscribe((value)=>{
      this.constructMap(value, mapper);
    })
  }
}
