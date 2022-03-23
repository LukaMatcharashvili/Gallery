import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterByTitle(arr:any, filter:any){
    return arr
    .filter(
      (o:any) =>
        filter.title == '' ||
        o.title.toLowerCase().includes((filter.title as any).toLowerCase())
    )
  }
}
