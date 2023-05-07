import {BasicMapperService} from "../mapper/basic-mapper.service";
import {CrudDataflowService} from "../data/crud-dataflow.service";
import {Subscription} from "rxjs";

export abstract class BaseAdmin {
  items:Map<string, string>[] = [];
  protected supprSubscription:Subscription;

  protected constructor(protected crud:CrudDataflowService) {
    this.supprSubscription = crud.getConfSupprSubject().subscribe((id)=>{
      console.log("hi mom")
      console.log(id);
    });
  }
  constructMap(value:Object[], mapper:BasicMapperService) {
    this.items = mapper.toPresentationKeys(value);
  }

  protected unsubscribe(): void {
    this.supprSubscription.unsubscribe()
  }
  protected subscribe(subscriptionAction:(id:number)=>void) {
    this.supprSubscription = this.crud.getConfSupprSubject().asObservable().subscribe(subscriptionAction);
  }
}
