import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { MenusComponent } from './menus/menus.component';
import { DessertsComponent } from './desserts/desserts.component';
import { BoissonsComponent } from './boissons/boissons.component';
import { ClientsComponent } from './clients/clients.component';
import { CommandesComponent } from './commandes/commandes.component';
import { LivreursComponent } from './livreurs/livreurs.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { PromotionsComponent } from './promotions/promotions.component';
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material/material.module";



@NgModule({
    declarations: [
        UtilisateursComponent,
        PizzasComponent,
        MenusComponent,
        DessertsComponent,
        BoissonsComponent,
        ClientsComponent,
        CommandesComponent,
        LivreursComponent,
        IngredientsComponent,
        StatistiquesComponent,
        PromotionsComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminModule { }
