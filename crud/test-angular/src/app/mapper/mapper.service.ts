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
    this.mapChamps.set('pizza', 'Pizza');
    this.mapChamps.set('menu', 'Menu');
    this.mapChamps.set('status', 'Status');
    this.mapChamps.set('dateCommande', 'date de création');
    this.mapChamps.set('nomMagasin', 'Pizzeria');
    this.mapChamps.set('adresse', 'Adresse');
    this.mapChamps.set('prix', 'Prix');
    this.mapChamps.set('nom', 'Nom');
    this.mapChamps.set('prenom', 'Prenom');
    this.mapChamps.set('email', 'E-Mail');
    this.mapChamps.set('version', 'Version');
    this.mapChamps.set('ingredients', 'Composition');
    this.mapChamps.set('toppings', 'Toppings');
    this.mapChamps.set('', '');
  }
}
