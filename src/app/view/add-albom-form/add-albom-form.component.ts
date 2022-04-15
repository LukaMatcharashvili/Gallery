import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-albom-form',
  templateUrl: './add-albom-form.component.html',
  styleUrls: ['./add-albom-form.component.css']
})
export class AddAlbomFormComponent implements OnInit {
  allowUpload:boolean = false;
  uploadedImage:any = "";
  onImageValueChange(event:any){
    let self = this;
    let reader = new FileReader();
    reader.addEventListener("load", function(){
      self.uploadInCloudinary(reader.result)
    })
    reader.readAsDataURL(event.target.files[0])
  }

  constructor(
    private db:DatabaseService,
    private cloudinary:CloudinaryService
    ) { }

  ngOnInit(): void {
    
  }
  onAlbomAddBtnClick(title:string){
    let formData = {
      title: title,
      image: this.uploadedImage,
      date: new Date().getTime()
    }
    this.db.addAlbom(formData)
  }
  
  uploadInCloudinary(file:any){
    this.cloudinary.uploadInCloudinary(file).subscribe((response:any) => {
      this.uploadedImage = response.url;
      this.allowUpload = true;
    })
  }
}
