import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  mapChamps = new Map<string, string>();
  constructor() {
    this.mapChamps.set('id', 'Identifiant');
    this.mapChamps.set('emailClient', 'E-mail du client');
    this.mapChamps.set('emailLivreur', 'E-mail du liveur');
    this.mapChamps.set('dateCommande', 'Date de création');
    this.mapChamps.set('nomMagasin', 'Pizzeria');
    this.mapChamps.set('email', 'E-Mail');
    this.mapChamps.set('ingredients', 'Composition');
    this.mapChamps.set('motDePasse', 'Mot de passe');
    this.mapChamps.set('codePostal', 'Code Postal');
    this.mapChamps.set('', '');
  }
}
