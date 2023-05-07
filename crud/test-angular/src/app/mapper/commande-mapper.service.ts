import { Injectable } from '@angular/core';
import {BasicMapperService} from "./basic-mapper.service";
import {MapperService} from "./mapper.service";
import {Commande} from "../models/commande";
import {CommandePresentation} from "../models/commande-presentation";

@Injectable({
  providedIn: 'root'
})
export class CommandeMapperService extends BasicMapperService{

  constructor(mapper:MapperService) {
    super(mapper);
  }

  toCommandePresentation(commande: Commande):CommandePresentation {
    return {
      id: commande.id,
      adresse: Object.values(commande.adresse).join(', '),
      commandeMenuList: commande.commandeMenuList.map(val=>val.menu.nom).join(', '),
      commandePizzaList: commande.commandePizzaList.map(val=>val.pizzaDto.nom).join(', '),
      dateCommande: commande.dateCommande.toLocaleString(),
      emailClient: commande.emailClient,
      emailLivreur: commande.emailLivreur,
      status: commande.status
    };
  }
}
