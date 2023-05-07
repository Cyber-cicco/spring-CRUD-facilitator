import { Injectable } from '@angular/core';
import {MapperService} from "./mapper.service";

@Injectable({
  providedIn: 'root'
})
export class BasicMapperService {

    constructor(private mapper:MapperService) {}
    toPresentationKeys(items:Object[]):Map<string, string>{
      let map = new Map<string,string>();
      for(let item of items){
        for(let [key, value] of Object.entries(item)){
          console.log(key);
          map.set((this.mapper.mapChamps.has(key)) ? this.mapper.mapChamps.get(key)! : key, value)
        }
      }
      console.log(map.entries());
      return map;
    }
}
