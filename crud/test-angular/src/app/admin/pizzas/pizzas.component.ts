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

@Component({
  selector: 'test-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent extends BaseAdmin<Pizza, PizzaPresentation> implements OnInit, OnDestroy {

  constructor(private pizzaService: PizzaService,
              private mapper: PizzaMapperService,
              crud: CrudDataflowService,
              modalService:MatDialog,
              private toppingService:ToppingService,
              private ingredientService:IngredientService,
              private pateService:PateService) {
    super(crud, modalService);

  }

  override constructMap(value: Pizza[], mapper: PizzaMapperService) {
    let pizzaPresentation: PizzaPresentation[] = [];
    for (let pizza of value) {
      pizzaPresentation.push(mapper.toPizzapresentation(pizza));
    }
    if (pizzaPresentation[0] != undefined) {
      this.items = mapper.toPresentationKeys(pizzaPresentation);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit(): void {
    this.pizzaService.getAll().subscribe((value) => {
      this.constructMap(value, this.mapper);
    })
    let fieldMap = new Map<string, string[]>();
    this.subscribe(this.pizzaService, this.mapper);
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
      this.crud.getAsyncFieldsSubscriptions().next(fieldMap)
    })
  }
}
