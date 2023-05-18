import { Injectable } from '@angular/core';
import { BasicMapperService } from 'src/app/config/mapper/basic-mapper.service';
import { MapperService } from 'src/app/config/mapper/mapper.service';
import { Commande } from 'src/app/config/models/commande';
import {CommandePresentation} from "../models/commande-presentation";
import { FormMapperService } from 'src/app/config/mapper/form-mapper.service';
import { TransferFormObject } from 'src/app/config/form-models/transfer-form-object';
import { FormCommande } from '../models/form-commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeMapperService extends BasicMapperService<Commande, CommandePresentation>{

  constructor(mapper:MapperService, formMapper: FormMapperService) {
    super(mapper, formMapper);
  }

  toPresentation(commande: Commande):CommandePresentation {
    return {
      id: commande.id,
      adresse: Object.values(commande.adresse).join(', '),
      commandeMenuList: commande.commandeMenuList.map(val=>val.menu?.nom).join(', '),
      commandePizzaList: commande.commandePizzaList.map(val=>val.pizzaDto?.nom).join(', '),
      dateCommande: commande.dateCommande?.toLocaleString(),
      emailClient: commande.emailClient,
      emailLivreur: commande.emailLivreur,
      status: commande.status
    };
  }
  override toFormMap(commande: Commande): TransferFormObject[] {
    let commandeMap:FormCommande = {
      id: commande.id,
      dateCommande: commande.dateCommande,
      status: commande.status,
      emailClient: commande.emailClient,
      emailLivreur: commande.emailLivreur,
      commandePizzaList: commande.commandePizzaList?.map(c=>{return {nom:c.pizzaDto?.nom!, nb:c.nbPizzas!}}) ?? [],
      commandeMenuList: commande.commandeMenuList?.map(c=>{return {nom:c.menu?.nom!, nb:c.nbMenus!}}) ?? [],
      nomMagasin: commande.nomMagasin,
      rue: commande.adresse.rue!,
      codePostal: commande.adresse.codePostal!,
      ville: commande.adresse.ville!
    }
    return super.toFormMap(commandeMap);
  }

  override fromFormToEntity(form: any): Commande {
    return {
      adresse: {rue:form.rue, ville:form.ville, codePostal:form.codePostal},
      commandeMenuList: form.commandeMenuList.map((cm:any) => { return {menu:{nom:cm.nom}, nbMenus:cm.nb }}),
      commandePizzaList: form.commandePizzaList.map((cp:any) => { return {pizzaDto:{nom:cp.nom}, nbPizzas:cp.nb }}),
      dateCommande: form.dateCommande,
      emailClient: form.emailClient,
      emailLivreur: form.emailLivreur,
      id: form.id,
      nomMagasin: form.nomMagasin,
      status: form.status
    }
  }
}
