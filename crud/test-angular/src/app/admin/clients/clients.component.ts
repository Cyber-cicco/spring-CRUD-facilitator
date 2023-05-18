import {Component} from '@angular/core';
import { Utilisateur } from 'src/app/config/models/utilisateur';
import { UtilisateurMapperService } from '../utilisateurs/mapper/utilisateur-mapper.service';
import { UtilisateurPresentation } from '../utilisateurs/models/utilisateur-presentation';
import { BaseAdmin } from 'src/app/config/models/base-admin';
import { ClientDataflowService } from './data/client-dataflow.service';
import { ClientHandlerService } from './providers/client-handler.service';

@Component({
  selector: 'test-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent extends BaseAdmin<Utilisateur, UtilisateurPresentation> {

  constructor(public utilisateurService:ClientHandlerService, public mapper:UtilisateurMapperService, crud:ClientDataflowService) {
    super(crud, utilisateurService);
  }
}
