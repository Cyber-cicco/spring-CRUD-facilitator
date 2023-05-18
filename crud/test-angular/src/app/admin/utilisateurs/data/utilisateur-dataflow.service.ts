import { Injectable } from '@angular/core';
import { CrudDataflowService } from 'src/app/config/data/crud-dataflow.service';
import { Utilisateur } from 'src/app/config/models/utilisateur';
import { FormCrudService } from 'src/app/shared/modal/crud/form-crud.service';
import { UtilisateurPresentation } from '../models/utilisateur-presentation';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurDataflowService extends CrudDataflowService<Utilisateur, UtilisateurPresentation> {

  constructor(formCrud:FormCrudService<Utilisateur, UtilisateurPresentation>) {
    super(formCrud);
  }
}
