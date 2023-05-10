import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  mapChamps = new Map<string, string>();
  constructor() {
    this.mapChamps.set('id', 'Identifiant').
    set('emailClient', 'E-mail du client').
    set('emailLivreur', 'E-mail du liveur').
    set('dateCommande', 'Date de création').
    set('nomMagasin', 'Pizzeria').
    set('email', 'E-Mail').
    set('ingredients', 'Composition').
    set('motDePasse', 'Mot de passe').
    set('codePostal', 'Code Postal').
    set('toppingList', 'Toppings').
    set('ingredientList', 'Ingredients').
    set('dateCommande', 'Date').
    set('commandePizzaList', 'Pizzas').
    set('commandeMenuList', 'Menus').
    set('', '').
    set('', '')
    //set('', '').
    //set('', '').
    //set('', '').
    //set('', '')
  }
}
