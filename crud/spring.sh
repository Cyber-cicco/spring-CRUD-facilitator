#!/bin/bash
 python3 spring.py --jpa -cname Adresse -f id rue ville codePostal &&
 python3 spring.py --jpa -cname Adresse -f id rue ville codePostal &&
 python3 spring.py --jpa -cname Accompagnement -f nom typeAccompagnement prix &&
 python3 spring.py --jpa -cname Accompagnement -f id nom typeAccompagnement prix &&
 python3 spring.py --jpa -cname Commande -f id livreur @commandePizzaList client status dateCommande @magasin @commandeMenuList @adresse &&
 python3 spring.py --jpa -cname CommandeMenu -f nbMenus @menu &&
 python3 spring.py --jpa -cname CommandPizza -f id nbPizzas @menu @commande &&
 python3 spring.py --jpa -cname CommandeMenu -f id nbMenus @menu @commande &&
 python3 spring.py --jpa -cname Ingredient -f id nom prix @pizzaList &&
 python3 spring.py --jpa -cname Magasin -f id nom prix @pizzaList &&
 python3 spring.py --jpa -cname Menu -f id prix nom photo description @accompagnementList @pizzaList @commandeMenuList &&
 python3 spring.py --jpa -cname Pate -f id nom prix @pizzaList &&
 python3 spring.py --jpa -cname Pizza -f id nom prix toCreate @pate code categorie version @toppingList @ingredientList @commandePizzaList &&
 python3 spring.py --jpa -cname Topping -f id nom prix @pizzaList 