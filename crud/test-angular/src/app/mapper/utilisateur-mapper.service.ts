import { Injectable } from '@angular/core';
import {Utilisateur} from "../models/utilisateur";
import {UtilisateurPresentation} from "../models/utilisateur-presentation";
import {BasicMapperService} from "./basic-mapper.service";
import {MapperService} from "./mapper.service";
import {FormMapperService} from "./form-mapper.service";
import {FormUser} from "../form-models/form-user";
import {Adresse} from "../models/adresse";
import {TransferFormObject} from "../models/transfer-form-object";

@Injectable({
    providedIn: 'root'
})
export class UtilisateurMapperService extends BasicMapperService<Utilisateur, UtilisateurPresentation> {

  constructor(mapper: MapperService, formMapper: FormMapperService) {
    super(mapper, formMapper);
  }

  toUtilisateurPresentation(utilisateur: Utilisateur): UtilisateurPresentation {
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
    let adresse: Adresse = utilisateur.adresseList[utilisateur.adresseList.length - 1]
    let formUser: FormUser = {
      id: utilisateur.id,
      email: utilisateur.email,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      motDePasse: utilisateur.motDePasse,
      rue: adresse.rue,
      codePostal: adresse.codePostal,
      ville: adresse.ville
    }
    return super.toFormMap(formUser);
  }
}
