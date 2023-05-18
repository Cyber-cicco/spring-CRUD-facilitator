import {BaseHandler} from "../providers/base-handler";
import {BaseEntity} from "../models/base-entity";
import {BasicMapperService} from "../mapper/basic-mapper.service";
import {CrudDataflowService} from "../data/crud-dataflow.service";
import { BaseTabEntity } from "../models/base-tab-entity";

/**
 * Interface à passer nécessairement à un formulaire de modification ou d'ajout d'une entité
 * Pour pouvoir déterminer les champs à remplir, le formulaire a besoin d'une entité.
 * Pour pouvoir envoyer les données au bon service, le formulaire a besoin d'un service possédant
 * la capacité de gérer les inputs et outputs du formulaire.
 * Pour pouvoir déterminer les champs à afficher dans le formulaire à partir d'une entité, le formulaire
 * a besoin du mapper de cette entité
 * Pour pourvoir récupérer les champs dépendants d'une autre entité, le formulaire a besoin de s'abonner
 * à un behaviour Subject contenant les champs en question.
 * */
export interface FormData<T extends BaseEntity, D extends BaseTabEntity> {
  entity:T,
  service:BaseHandler<T, D>,
  mapper:BasicMapperService<T, D>,
  crud:CrudDataflowService<T, D>
}
