import { Component } from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";
import {BaseAdmin} from "../../models/base-admin";
import {BasicMapperService} from "../../mapper/basic-mapper.service";

@Component({
  selector: 'test-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent extends BaseAdmin{
  constructor(private boissonService:AccompagnementService, private mapper:BasicMapperService) {
    super();
    this.boissonService.getAllBoissons().subscribe((value)=>{
      this.constructMap(value, mapper);
    })
  }


}
