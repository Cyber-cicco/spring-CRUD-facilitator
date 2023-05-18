import {Component, OnInit} from '@angular/core';
import { Pizza } from 'src/app/config/models/pizza';
import { PizzaHandlerService } from './providers/pizza-handler.service';
import { BaseAdmin } from 'src/app/config/models/base-admin';
import { PizzaMapperService } from './mapper/pizza-mapper.service';
import { PizzaPresentation } from './models/pizza-presentation';
import { ToppingService } from 'src/app/config/providers/topping.service';
import { IngredientService } from 'src/app/config/providers/ingredient.service';
import { PateService } from 'src/app/config/providers/pate.service';
import {map, Observable} from "rxjs";
import { Categorie } from 'src/app/config/enums/categorie-enum';
import { PizzaDataflowService } from './data/pizza-dataflow.service';

@Component({
  selector: 'test-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent extends BaseAdmin<Pizza, PizzaPresentation> implements OnInit {

  constructor(public pizzaService: PizzaHandlerService,
              public mapper: PizzaMapperService,
              crud: PizzaDataflowService,
              private toppingService:ToppingService,
              private ingredientService:IngredientService,
              private pateService:PateService) {
    super(crud, pizzaService);

  }


  ngOnInit(): void {
    let fieldMap = new Map<string, string[]>();
    new Observable((observer)=>{
      this.toppingService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set("toppingList", value));
      this.ingredientService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set("ingredientList", value));
      this.pateService.getAll()
        .pipe(map(value => value.map(t=>t.nom)))
        .subscribe(value => fieldMap.set("pate", value));
      observer.next("done");
    }).subscribe(()=>{
      fieldMap.set('categorie', [Categorie.PETITE, Categorie.MOYENNE, Categorie.GRANDE]);
      console.log(fieldMap);
      this.crud.getAsyncFieldsSubscriptions().next(fieldMap)
    })
  }
}
