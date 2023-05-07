import { Component } from '@angular/core';
import {Pizza} from "../../models/pizza";
import {PizzaService} from "../../providers/pizza.service";

@Component({
  selector: 'test-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent {

  items:Pizza[] = [];

  constructor(private pizzaService:PizzaService) {
    this.pizzaService.getAll().subscribe((value)=>{
      this.items = value;
    })
  }
}
