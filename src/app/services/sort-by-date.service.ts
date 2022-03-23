import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortByDateService {

  constructor() { }
  unsortByDate(arr:any[]){
    return arr.sort(function(a,b){return Number(a.date) - Number(b.date)});
  }
  sortByDate(arr:any[]){
    return arr.sort(function(a,b){return Number(b.date) - Number(a.date)});
  }
}
