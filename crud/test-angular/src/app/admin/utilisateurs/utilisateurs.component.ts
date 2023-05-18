import {Component} from '@angular/core';
import { Utilisateur } from 'src/app/config/models/utilisateur';
import { UtilisateurMapperService } from './mapper/utilisateur-mapper.service';
import { UtilisateurPresentation } from './models/utilisateur-presentation';
import { BaseAdmin } from 'src/app/config/models/base-admin';
import { UtilisateurDataflowService } from './data/utilisateur-dataflow.service';
import { UtilisateurHandlerService } from './providers/utilisateur-handler.service';

@Component({
  selector: 'test-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent extends BaseAdmin<Utilisateur, UtilisateurPresentation> {

  constructor(public utilisateurService:UtilisateurHandlerService,
              public mapper:UtilisateurMapperService,
              crud:UtilisateurDataflowService,
              ) {
    super(crud, utilisateurService);
  }
}
