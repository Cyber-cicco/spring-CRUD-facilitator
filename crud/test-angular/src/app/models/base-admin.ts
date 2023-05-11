import {CrudDataflowService} from "../data/crud-dataflow.service";
import {MatDialog} from "@angular/material/dialog";
import {BaseEntity} from "./base-entity";

export abstract class BaseAdmin<T extends BaseEntity, D extends BaseEntity> {

  /**Souscription au clique du bouton supprimer, récupérant l'id de l'entité à supprmier*/
  protected constructor(protected crud:CrudDataflowService<T>, protected modalService:MatDialog) {}

}
