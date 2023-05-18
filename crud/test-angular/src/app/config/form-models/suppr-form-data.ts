import {BaseHandler} from "../providers/base-handler";
import {BaseEntity} from "../models/base-entity";
import {CrudDataflowService} from "../data/crud-dataflow.service";

/**
 * Données nécessaires pour que la modale de supression d'une entité puisse fonctionner
 * Demande un service capable de gérer les actions entrainées par le fait d'appuyer sur l'un
 * des deux bouttons
 * Demande l'id de l'entité à supprimer
 * Demande un utilitaire permettant de passer le nouveau résultat d'un getAll() pour alimenter le tableau.
 * TODO : transférer cette dernière fonctionalité au service.
 * */
export interface SupprFormData<T extends BaseEntity,D extends BaseEntity> {
  service:BaseHandler<T, D>,
  entity:T
  crud:CrudDataflowService<T, D>
}
