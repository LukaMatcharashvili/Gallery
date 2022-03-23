import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { FilterService } from 'src/app/services/filter.service';
import { ImagesService } from 'src/app/services/images.service';
import { SortByDateService } from 'src/app/services/sort-by-date.service';
import { ImageDeleteAlertComponent } from '../image-delete-alert/image-delete-alert.component';
import { InspectImageComponent } from '../inspect-image/inspect-image.component';

@Component({
  selector: 'app-images-area',
  templateUrl: './images-area.component.html',
  styleUrls: ['./images-area.component.css']
})
export class ImagesAreaComponent implements OnInit {
  imagesList:any[] = [];
  tempimagesList:any[] = [];
  filterTitle!:any;
  key:string = "";
  constructor(
    private dialog:MatDialog,
    private imagesService:ImagesService,
    private db:DatabaseService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private sort:SortByDateService,
    private filter:FilterService) { }

  ngOnInit(): void {
    this.readAllImages();
  }
  readAllImages(){
    this.activatedRoute.params.subscribe((params:Params) => {
      this.key = params['key']
    })
    let images = this.db.getAlbomsAllImages(this.key)
    images.subscribe((response) => {
      this.imagesList = response
      this.tempimagesList = response
    })
  }
  goToAddImageAreaBtnClick(){
    this.activatedRoute.params.subscribe((params:Params) => {
      this.key = params['key']
    })
    this.router.navigate(['add-image', this.key])
  }
  onImageDeleteAlertBtnClick(imageKey:any){
    this.activatedRoute.params.subscribe((params:Params) => {
      this.key = params['key']
    })
    this.imagesService.imageKey = imageKey;
    this.imagesService.albomKey = this.key;
    this.dialog.open(ImageDeleteAlertComponent)
  }

  onImageInspectBtnClick(imageKey:any){
    this.activatedRoute.params.subscribe((params:Params) => {
      this.key = params['key']
    })
    this.imagesService.imageKey = imageKey;
    this.imagesService.albomKey = this.key;
    this.dialog.open(InspectImageComponent)
  }
  onUnSortBtnClick(){
    this.sort.unsortByDate(this.imagesList)
  }
  
  onSortBtnClick(){
    this.sort.sortByDate(this.imagesList)
  }

  onFilterChange(){
    let form = {
      title: this.filterTitle
    }
    this.imagesList = this.filter.filterByTitle(this.tempimagesList, form)
  }

  onImageUpdateFormOpenBtnClick(imageKey:any){
    this.activatedRoute.params.subscribe((params:Params) => {
      this.key = params['key']
    })
    this.router.navigate(['update-image', this.key, imageKey])
  }
}
