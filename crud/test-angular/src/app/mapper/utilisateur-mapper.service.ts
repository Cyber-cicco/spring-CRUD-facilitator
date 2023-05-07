import { Injectable } from '@angular/core';
import {Utilisateur} from "../models/utilisateur";
import {UtilisateurPresentation} from "../models/utilisateur-presentation";
import {BasicMapperService} from "./basic-mapper.service";
import {MapperService} from "./mapper.service";

@Injectable({
    providedIn: 'root'
})
export class UtilisateurMapperService extends BasicMapperService {

  constructor(mapper:MapperService) {
    super(mapper);
  }
  toUtilisateurPresentation(utilisateur:Utilisateur):UtilisateurPresentation{
    let lastAdresse = utilisateur.adresseList[utilisateur.adresseList.length-1];
    return {
      id: utilisateur.id,
      nom:utilisateur.nom,
      prenom: utilisateur.prenom,
      adresse:lastAdresse.rue + ', ' + lastAdresse.codePostal + lastAdresse.ville,
      email: utilisateur.email,
    }
  }

}
