import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlbomsService } from 'src/app/services/alboms.service';
import { DatabaseService } from 'src/app/services/database.service';
import { FilterService } from 'src/app/services/filter.service';
import { SortByDateService } from 'src/app/services/sort-by-date.service';
import { AddAlbomFormComponent } from '../add-albom-form/add-albom-form.component';
import { DeleteAlbomAlertComponent } from '../delete-albom-alert/delete-albom-alert.component';

@Component({
  selector: 'app-alboms-area',
  templateUrl: './alboms-area.component.html',
  styleUrls: ['./alboms-area.component.css']
})
export class AlbomsAreaComponent implements OnInit {
  
  tempAlbomsList:any[] = [];
  albomsList:any[] = [];
  
  filterTitle!:any;

  constructor(
    private dialog:MatDialog,
    private db:DatabaseService,
    private albomsService:AlbomsService,
    private sort:SortByDateService,
    private filter:FilterService) { }

  ngOnInit(): void {
    this.albomsList = [];
    this.readAllAlboms()
  }
  readAllAlboms(){
    let alboms = this.db.getUsersAllAlbom();
    alboms.subscribe((response:any) => {
      this.albomsList = response;
      this.tempAlbomsList = response;
    })
  }

  onAlbomAddBtnClick(){
    this.dialog.open(AddAlbomFormComponent)
  }

  onAlbomDeleteAlertBtnClick(key:string){
    this.albomsService.albomKey = key;
    this.dialog.open(DeleteAlbomAlertComponent)
  }

  onUnSortBtnClick(){
    this.sort.unsortByDate(this.albomsList)
  }
  
  onSortBtnClick(){
    this.sort.sortByDate(this.albomsList)
  }

  onFilterChange(){
    let form = {
      title: this.filterTitle
    }
    this.albomsList = this.filter.filterByTitle(this.tempAlbomsList, form)
  }
}
