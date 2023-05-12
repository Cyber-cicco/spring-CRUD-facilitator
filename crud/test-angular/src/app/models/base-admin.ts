import {CrudDataflowService} from "../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {BaseEntity} from "./base-entity";
import {BasicService} from "../providers/basic-service";
import {Subscription} from "rxjs";

export abstract class BaseAdmin<T extends BaseEntity, D extends BaseEntity> {

  private subEntites:Subscription = new Subscription();
  public items?:T[]
  /**Souscription au clique du bouton supprimer, récupérant l'id de l'entité à supprmier*/
  protected constructor(protected crud:CrudDataflowService<T>, protected modalService:MatDialog, public service:BasicService<T>) {
    this.service.getAll().subscribe(value=>{
      this.items = value;
    });
    this.subEntites = this.crud.getTabRowSubject().subscribe(value => {
      this.items = value
    });
  }

  unsubscribe(): void {
    this.subEntites.unsubscribe();
  }
}
