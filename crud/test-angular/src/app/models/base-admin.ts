import {BasicMapperService} from "../mapper/basic-mapper.service";

export abstract class BaseAdmin {
  items:Map<string, string>[] = [];

  protected constructor() {
  }
  constructMap(value:Object[], mapper:BasicMapperService) {
    this.items.push(mapper.toPresentationKeys(value));
  }
}
