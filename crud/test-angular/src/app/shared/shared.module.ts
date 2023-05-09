import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TableauComponent } from './tableau/tableau.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ModalSupprComponent } from './modal/modal-suppr/modal-suppr.component';
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../material/material.module";
import { ModalModifComponent } from './modal/modal-modif/modal-modif.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";



@NgModule({
    declarations: [
        NavbarComponent,
        TableauComponent,
        ModalSupprComponent,
        ModalModifComponent,
    ],
    exports: [
        NavbarComponent,
        TableauComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        MatButtonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule
    ]
})
export class SharedModule { }
