import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-inspect-image',
  templateUrl: './inspect-image.component.html',
  styleUrls: ['./inspect-image.component.css']
})
export class InspectImageComponent implements OnInit {

  constructor(
    private db:DatabaseService,
    private imagesService:ImagesService) { }

  imageUrl:string = "";
  description:string = "";
  title:string = "";
  imageKey:string = "";
  albomKey:string = "";
  ngOnInit(): void {
    this.albomKey = this.imagesService.albomKey;
    this.imageKey = this.imagesService.imageKey;
    this.db.getImage(this.albomKey, this.imageKey).subscribe((response:any) => {
      this.imageUrl = response.image;
      this.description = response.description;
      this.title = response.title;
    })
  }

}
