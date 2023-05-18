import {Component} from '@angular/core';
import { UtilisateurPresentation } from '../utilisateurs/models/utilisateur-presentation';
import { UtilisateurMapperService } from '../utilisateurs/mapper/utilisateur-mapper.service';
import { BaseAdmin } from 'src/app/config/models/base-admin';
import { Utilisateur } from 'src/app/config/models/utilisateur';
import { UtilisateurDataflowService } from '../utilisateurs/data/utilisateur-dataflow.service';
import { LivreurHandlerService } from './providers/liveur-handler.service';

@Component({
  selector: 'test-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent extends BaseAdmin<Utilisateur, UtilisateurPresentation>{

    constructor(public utilisateurService:LivreurHandlerService, public mapper:UtilisateurMapperService, crud:UtilisateurDataflowService) {
    super(crud, utilisateurService);

  }
}
