import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pizza} from "../../models/pizza";
import {PizzaService} from "../../providers/pizza.service";
import {BaseAdmin} from "../../models/base-admin";
import {PizzaMapperService} from "../../mapper/pizza-mapper.service";
import {PizzaPresentation} from "../../models/pizza-presentation";
import {CrudDataflowService} from "../../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {ToppingService} from "../../providers/topping.service";
import {IngredientService} from "../../providers/ingredient.service";
import {PateService} from "../../providers/pate.service";
import {map, Observable} from "rxjs";
import {Categorie} from "../../form-models/categorie-enum";
import {PizzaDataflowService} from "../../data/pizza-dataflow.service";

@Component({
  selector: 'test-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent extends BaseAdmin<Pizza, PizzaPresentation> implements OnInit {

  constructor(public pizzaService: PizzaService,
              public mapper: PizzaMapperService,
              crud: PizzaDataflowService,
              modalService:MatDialog,
              private toppingService:ToppingService,
              private ingredientService:IngredientService,
              private pateService:PateService) {
    super(crud, modalService);

  }


  ngOnInit(): void {
    let fieldMap = new Map<string, string[]>();
    new Observable((observer)=>{
      this.toppingService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(this.mapper.changeNameToPretty("toppingList"), value));
      this.ingredientService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(this.mapper.changeNameToPretty("ingredientList"), value));
      this.pateService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set(this.mapper.changeNameToPretty("pate"), value));
      observer.next("done");
    }).subscribe(()=>{
      fieldMap.set(this.mapper.changeNameToPretty('categorie'), [Categorie.PETITE, Categorie.MOYENNE, Categorie.GRANDE]);
      this.crud.getAsyncFieldsSubscriptions().next(fieldMap)
    })
  }
}
