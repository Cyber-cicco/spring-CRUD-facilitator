import {Component} from '@angular/core';
import { BaseAdmin } from 'src/app/config/models/base-admin';
import { Accompagnement } from 'src/app/config/models/accompagnement';
import { AccompagnementPresentation } from '../boissons/models/accompagnement-presentation';
import { DessertDataflowService } from './data/dessert-dataflow.service';
import { AccompagnementMapperService } from '../boissons/mapper/accompagnement-mapper.service';
import { DessertHandlerService } from './providers/dessert-handler.service';

@Component({
  selector: 'test-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> {

  constructor(public dessertService:DessertHandlerService, public mapper:AccompagnementMapperService, crud:DessertDataflowService) {
   super(crud, dessertService);
  }
}
