import { Injectable } from '@angular/core';

/**
 * Permet de mapper les noms des champs des entités vers le nom que l'on souhaite afficher dans le tableau
 * */
@Injectable({
  providedIn: 'root'
})
export class MapperService {

  mapChamps = new Map<string, string>();
  /**
   * Dans cette map doit se rajouter le mapping du nom des champs vers le nom du champ dans le tableau
   * */
  constructor() {
    this.mapChamps.set('id', 'Identifiant')
    .set('emailClient', 'E-mail du client')
    .set('emailLivreur', 'E-mail du liveur')
    .set('dateCommande', 'Date de création')
    .set('nomMagasin', 'Pizzeria')
    .set('email', 'E-Mail')
    .set('ingredients', 'Composition')
    .set('motDePasse', 'Mot de passe')
    .set('codePostal', 'Code Postal')
    .set('toppingList', 'Toppings')
    .set('ingredientList', 'Ingredients')
    .set('dateCommande', 'Date')
    .set('commandePizzaList', 'Pizzas')
    .set('commandeMenuList', 'Menus')
    .set('', '')
  }
}
