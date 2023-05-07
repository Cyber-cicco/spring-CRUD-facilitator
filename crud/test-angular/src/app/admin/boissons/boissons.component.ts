import { Component } from '@angular/core';
import {AccompagnementService} from "../../providers/accompagnement.service";

@Component({
  selector: 'test-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent {
  items:{nom:string, prix:number}[] = [];
  constructor(private boissonService:AccompagnementService) {
    this.boissonService.getAllBoissons().subscribe((value)=>{
      this.items = value;
    })
  }

}
