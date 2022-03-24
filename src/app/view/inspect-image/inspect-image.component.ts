import { Component, OnInit } from '@angular/core';
import { getImage } from 'src/app/models/updateImage-model';
import { DatabaseService } from 'src/app/services/database.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-inspect-image',
  templateUrl: './inspect-image.component.html',
  styleUrls: ['./inspect-image.component.css']
})
export class InspectImageComponent implements OnInit {
  imageKey:string = "";
  albomKey:string = "";
  constructor(
    private db:DatabaseService,
    private imagesService:ImagesService)
  { }
  
  imageData:getImage = new getImage()
  
  ngOnInit(): void {
    this.albomKey = this.imagesService.albomKey;
    this.imageKey = this.imagesService.imageKey;
    this.db.getImage(this.albomKey, this.imageKey).subscribe((response:any) => {
      this.imageData.imageUrl = response.image;
      this.imageData.description = response.description;
      this.imageData.title = response.title;
    })
  }

}
