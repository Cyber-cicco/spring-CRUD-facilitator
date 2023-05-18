import {Component} from '@angular/core';
import {BaseAdmin} from "../../config/models/base-admin";
import {Accompagnement} from "../../config/models/accompagnement";
import {AccompagnementPresentation} from "./models/accompagnement-presentation";
import { BoissonHandlerService } from './providers/boisson-handler.service';
import {AccompagnementMapperService} from "./mapper/accompagnement-mapper.service";
import {BoissonDataflowService} from "./data/boisson-dataflow.service";

@Component({
  selector: 'test-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent extends BaseAdmin<Accompagnement, AccompagnementPresentation> {
  constructor(public boissonService: BoissonHandlerService, public mapper: AccompagnementMapperService, crud: BoissonDataflowService) {
    super(crud, boissonService);
  }
}
