import { Injectable } from '@angular/core';
import { Utilisateur } from 'src/app/config/models/utilisateur';
import {UtilisateurPresentation} from "../models/utilisateur-presentation";
import { BasicMapperService } from 'src/app/config/mapper/basic-mapper.service';
import { MapperService } from 'src/app/config/mapper/mapper.service';
import { FormUser } from '../models/form-user';
import { Adresse } from 'src/app/config/models/adresse';
import { TransferFormObject } from 'src/app/config/form-models/transfer-form-object';
import { FormMapperService } from 'src/app/config/mapper/form-mapper.service';

@Injectable({
    providedIn: 'root'
})
export class UtilisateurMapperService extends BasicMapperService<Utilisateur, UtilisateurPresentation> {

  constructor(mapper: MapperService, formMapper: FormMapperService) {
    super(mapper, formMapper);
  }

  toPresentation(utilisateur: Utilisateur): UtilisateurPresentation {
    let lastAdresse = utilisateur.adresseList[utilisateur.adresseList.length - 1];
    return {
      id: utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      adresse: lastAdresse.rue + ', ' + lastAdresse.codePostal + lastAdresse.ville,
      email: utilisateur.email,
    }
  }
  override toFormMap(utilisateur: Utilisateur): TransferFormObject[] {
    let adresse: Partial<Adresse> | null = (utilisateur.adresseList ===null) ? null : utilisateur?.adresseList[utilisateur.adresseList?.length - 1] ?? []
    let formUser: FormUser = {
      id: utilisateur.id,
      email: utilisateur.email,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      motDePasse: utilisateur.motDePasse,
      rue: adresse?.rue!,
      codePostal: adresse?.codePostal!,
      ville: adresse?.ville!
    }
    return super.toFormMap(formUser);
  }
  override fromFormToEntity(form: any): Utilisateur {
    return {
      adresseList: [{rue:form.rue, codePostal:form.codePostal, ville: form.ville}],
      commandeList: [],
      email: form.email,
      id: form.id,
      isAdmin: false,
      isLivreur: false,
      motDePasse: form.motDePasse,
      nom: form.nom,
      prenom: form.prenom
    };
  }
}
