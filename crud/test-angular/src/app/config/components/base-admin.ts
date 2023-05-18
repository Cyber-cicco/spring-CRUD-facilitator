import {CrudDataflowService} from "../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {BaseEntity} from "../models/base-entity";
import {Subscription} from "rxjs";
import { BaseTabEntity } from "../models/base-tab-entity";
import { BaseHandler } from "../providers/base-handler";

/**
 * Classe abstraite permettant d'initialiser les entités à récupérer du coté back
 * et de souscrire à toute forme de changement du contenu des entités
 * */
export abstract class BaseAdmin<T extends BaseEntity, D extends BaseTabEntity> {

  /**Souscription permettant de récupérer la valeur des entités lorsqu'elles changent*/
  private subEntites:Subscription = new Subscription();

  /**Entités du composant*/
  public items?:T[]
  protected constructor(protected crud:CrudDataflowService<T, D>, protected modalService:MatDialog, public service:BaseHandler<T, D>) {
    this.service.getAll().subscribe(value=>{
      this.items = value;
    });
    this.subEntites = this.crud.getTabRowSubject().subscribe(value => {
      this.items = value
    });
  }

  /**méthode appelée lors de la destruction du composant*/
  unsubscribe(): void {
    this.subEntites.unsubscribe();
  }
}
