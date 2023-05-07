import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TableauComponent } from './tableau/tableau.component';
import {RouterLink, RouterLinkActive} from "@angular/router";



@NgModule({
    declarations: [
        NavbarComponent,
        TableauComponent
    ],
    exports: [
        NavbarComponent,
        TableauComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class SharedModule { }
