import { Component } from '@angular/core';
import {Accompagnement} from "../../models/accompagnement";
import {AccompagnementService} from "../../providers/accompagnement.service";

@Component({
  selector: 'test-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent {

  items:Accompagnement[] = [];

  constructor(private dessertService:AccompagnementService) {
    this.dessertService.getAllDessert().subscribe((value)=>{
      this.items = value;
    })
  }
}
