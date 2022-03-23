import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image-delete-alert',
  templateUrl: './image-delete-alert.component.html',
  styleUrls: ['./image-delete-alert.component.css']
})
export class ImageDeleteAlertComponent implements OnInit {
  albomKey:string = "";
  imageKey:string = "";
  constructor(
    private imagesService:ImagesService,
    private db:DatabaseService) { }
  
  ngOnInit(): void {
    this.imageKey = this.imagesService.imageKey;
    this.albomKey = this.imagesService.albomKey;
  }
  onImageDelete(){
    this.db.deleteImage(this.albomKey, this.imageKey)
  }
}
