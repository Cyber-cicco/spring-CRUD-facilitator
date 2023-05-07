import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pizza} from "../../models/pizza";
import {PizzaService} from "../../providers/pizza.service";
import {BaseAdmin} from "../../models/base-admin";
import {PizzaMapperService} from "../../mapper/pizza-mapper.service";
import {PizzaPresentation} from "../../models/pizza-presentation";
import {CrudDataflowService} from "../../data/crud-dataflow.service";

@Component({
  selector: 'test-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent extends BaseAdmin implements OnInit, OnDestroy {

  constructor(private pizzaService: PizzaService, mapper: PizzaMapperService, crud: CrudDataflowService) {
    super(crud);
    this.pizzaService.getAll().subscribe((value) => {
      this.constructMap(value, mapper);
    })
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
    this.subscribe((id:number)=>{
      this.pizzaService.deleteById(String(id));
    },
      (id:number)=>{},
      ()=>{});
  }
}
