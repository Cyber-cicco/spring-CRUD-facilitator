import { Injectable } from '@angular/core';
import {MapperService} from "./mapper.service";

@Injectable({
  providedIn: 'root'
})
export class BasicMapperService {

    constructor(private mapper:MapperService) {}
    toPresentationKeys(items:Object[]):Map<string, string>[]{
      let mapArray:Map<string,string>[] = [];
      for(let item of items){
        let map = new Map<string, string>();
        for(let [key, value] of Object.entries(item)){
          map.set((this.mapper.mapChamps.has(key)) ? this.mapper.mapChamps.get(key)! : key, value)
        }
        mapArray.push(map);
      }
      return mapArray;
    }
}
