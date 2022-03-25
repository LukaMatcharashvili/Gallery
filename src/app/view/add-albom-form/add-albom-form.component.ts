import { Component, OnInit } from '@angular/core';
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
  
  uploadInCloudinary(file:any){
    let self = this;
    let url = `https://api.cloudinary.com/v1_1/dr9pyz8sz/upload`;
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        let url = response.secure_url;
        let tokens = url.split('/');
        tokens.splice(-2, 0, 'w_150,c_scale');
        let img = "";
        img = tokens.join('/');
        self.uploadedImage =  img;
        self.allowUpload = true;
      }else{
        self.uploadedImage =  file;
        self.allowUpload = true;
      }
    };
    fd.append("upload_preset", "pv5ptgle");
    fd.append('file', file);
    xhr.send(fd);
  }
}
