import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-albom-form',
  templateUrl: './add-albom-form.component.html',
  styleUrls: ['./add-albom-form.component.css']
})
export class AddAlbomFormComponent implements OnInit {
  
  uploadedImage:any = "";
  onImageValueChange(event:any){
    let self = this;
    let reader = new FileReader();
    reader.addEventListener("load", function(){
      self.uploadedImage = reader.result;
    })
    reader.readAsDataURL(event.target.files[0])
  }

  constructor(private db:DatabaseService) { }

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
}
