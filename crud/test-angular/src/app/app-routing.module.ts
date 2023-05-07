import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UtilisateursComponent} from "./admin/utilisateurs/utilisateurs.component";
import {BoissonsComponent} from "./admin/boissons/boissons.component";
import {CommandesComponent} from "./admin/commandes/commandes.component";
import {DessertsComponent} from "./admin/desserts/desserts.component";
import {IngredientsComponent} from "./admin/ingredients/ingredients.component";
import {LivreursComponent} from "./admin/livreurs/livreurs.component";
import {MenusComponent} from "./admin/menus/menus.component";
import {PizzasComponent} from "./admin/pizzas/pizzas.component";
import {StatistiquesComponent} from "./admin/statistiques/statistiques.component";
import {PromotionsComponent} from "./admin/promotions/promotions.component";
import {ClientsComponent} from "./admin/clients/clients.component";

const routes: Routes = [
  {path:'utilisateurs', component:UtilisateursComponent},
  {path:'boissons', component:BoissonsComponent},
  {path:'commandes', component:CommandesComponent},
  {path:'desserts', component:DessertsComponent},
  {path:'ingredients', component:IngredientsComponent},
  {path:'livreurs', component:LivreursComponent},
  {path:'clients', component:ClientsComponent},
  {path:'menus', component:MenusComponent},
  {path:'pizzas', component:PizzasComponent},
  {path:'statistiques', component:StatistiquesComponent},
  {path:'promotions', component:PromotionsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
