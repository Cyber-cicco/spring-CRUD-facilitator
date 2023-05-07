import {BasicMapperService} from "../mapper/basic-mapper.service";
import {CrudDataflowService} from "../data/crud-dataflow.service";
import {Subscription} from "rxjs";

export abstract class BaseAdmin {
  items:Map<string, string>[] = [];
  protected supprSubscription:Subscription;
  protected modifSubscription:Subscription;
  protected creationSubscription:Subscription;

  protected constructor(protected crud:CrudDataflowService) {
    this.supprSubscription = crud.getConfSupprSubject().subscribe();
    this.modifSubscription = crud.getConfModifSubject().subscribe();
    this.creationSubscription = crud.getConfCreationSubject().subscribe();
  }
  constructMap(value:Object[], mapper:BasicMapperService) {
    this.items = mapper.toPresentationKeys(value);
  }

  protected unsubscribe(): void {
    this.supprSubscription.unsubscribe();
    this.modifSubscription.unsubscribe();
    this.creationSubscription.unsubscribe();
  }
  protected subscribe(subscriptionDeletion:(id:number)=>void, subModif:(id:number)=>void, creationModif:()=>void) {
    this.supprSubscription = this.crud.getConfSupprSubject().asObservable().subscribe(subscriptionDeletion);
    this.modifSubscription = this.crud.getConfModifSubject().asObservable().subscribe(subModif);
    this.creationSubscription = this.crud.getConfCreationSubject().asObservable().subscribe(creationModif);
  }
}
