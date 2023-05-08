import {BasicMapperService} from "../mapper/basic-mapper.service";
import {CrudDataflowService} from "../data/crud-dataflow.service";
import {Subscription} from "rxjs";
import {BasicService} from "../providers/basic-service";
import {MatDialog} from "@angular/material/dialog";
import {ModalModifComponent} from "../shared/modal/modal-modif/modal-modif.component";

/**
 * Classe abstraite représentant les comportements attendus des composants liés à l'administration des
 * différents éléments de la base de données.
 * Cette classe gère deux choses:
 *  - le cycle de vie du composant Angular, avec les méthodes subscribe et unsubscribe devant être appelés
 *  respectivement à l'initialisation et à la destruction du composant, et l'initialisation du service et
 *  du mapper associé au composant.
 *  - les subscriptions du composant aux événements du tableau générique et des modales auquel il est rattaché.
 *  A noter qu'il est déconseillé d'y mettre quoi que ce soit n'étant pas rattaché aux opérations de CRUD basiques.
 *  Les méthodes spécifiques à une entité, comme l'activation ou désactivation d'un compte, ou l'impression d'un bulletin
 *  de paix d'un livreur devraient être obligatoirement rattachée au composant héritant de cette classe, et non à
 *  cette classe abstraite.
 *  @param T = entité auquel le composant est rattaché pour l'administration du CRUD
 *  @param D = présentation de l'entité dans le tableau qui lui est rattaché.
 * */
export abstract class BaseAdmin<T extends Object, D extends Object> {
  /**Objet passé au tableau pour son affichage. La clé est l'en tête, la valeur le contenu du champ*/
  items:Map<string, string>[] = [];
  /**Souscription au clique du bouton supprimer, récupérant l'id de l'entité à supprmier*/
  protected supprSubscription:Subscription;
  /**Souscription au clique du bouton modifier dans le formulaire de la modale. Récupère une map des clés
   * valeurs de l'objet
   * */
  protected modifSubscription:Subscription;
  /**Souscription au clique sur le bouton modifier du tableau. Récupère l'id de l'entité à modifier*/
  protected modifNotifSubscription:Subscription;
  /**Souscription au clique sur le bouton créer du tableau*/
  protected creationSubscription:Subscription;

  /**Initialisation des souscriptions dans le constructeur*/
  protected constructor(protected crud:CrudDataflowService, protected modalService:MatDialog) {
    this.supprSubscription = crud.getConfSupprSubject().subscribe();
    this.modifSubscription = crud.getConfModifSubject().subscribe();
    this.creationSubscription = crud.getConfCreationSubject().subscribe();
    this.modifNotifSubscription = crud.getModifNotifSubject().subscribe();
  }
  showDatas(service:BasicService<T>, mapper:BasicMapperService<T, D>){
    service.getAll().subscribe((value)=>{
      this.items = [];
      this.constructMap(value, mapper);
    })
  }

  /**Méthode de construction de la map offerte au tableau pour l'affichage des entités*/
  constructMap(value:D[] | T[], mapper:BasicMapperService<T, D>) {
    this.items = mapper.toPresentationKeys(value);
  }

  /**Méthode de cycle de vie permettant de fermer toutes les subscriptions du composant*/
  protected unsubscribe(): void {
    this.supprSubscription.unsubscribe();
    this.modifSubscription.unsubscribe();
    this.creationSubscription.unsubscribe();
    this.modifNotifSubscription.unsubscribe();
  }

  /**Méthode du cycle de vie permettant de définir les subscriptions et les comportements à adopter en fonction
   * des notifications reçues.
   * //TODO : implémenter les foncitonalité pour les subscriptions à la modification et la suppression
   * */
  protected subscribe(service:BasicService<T>, mapper:BasicMapperService<T, D>) {
    this.supprSubscription = this.crud.getConfSupprSubject().asObservable().subscribe((id:number)=>{
      service.deleteById(String(id)).subscribe(value=>{
        console.log(value);
        this.showDatas(service, mapper);
      });
    });
    this.modifSubscription = this.crud.getConfModifSubject().asObservable().subscribe();
    this.creationSubscription = this.crud.getConfCreationSubject().asObservable().subscribe();
    this.modifNotifSubscription = this.crud.getModifNotifSubject().asObservable().subscribe((id)=>{
        service.getById(String(id)).subscribe((value)=>{
          let formMap = mapper.toFormMap(value);
          this.crud.getModifSubject().next(formMap);
          this.modalService.open(ModalModifComponent);
      })
    });
  }
}
