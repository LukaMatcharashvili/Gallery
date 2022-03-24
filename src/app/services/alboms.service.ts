import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlbomsService {

  constructor() { }
  public albomKey!:any;

  public albomTitleEmitter:EventEmitter<any> = new EventEmitter()
}
