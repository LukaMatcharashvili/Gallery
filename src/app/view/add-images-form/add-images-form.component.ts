import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlbomsService } from 'src/app/services/alboms.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-images-form',
  templateUrl: './add-images-form.component.html',
  styleUrls: ['./add-images-form.component.css']
})
export class AddImagesFormComponent implements OnInit {
  key:string = "";
  formData:any = {};
  uploadedImage:any = "";
  allowUpload:boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute, 
    private db:DatabaseService) { }
    
  ngOnInit(): void {
      this.createFormData();
      this.activatedRoute.params.subscribe((params:Params) => {
        this.key = params['key']
      })
  }
  onImageValueChange(event:any){
    let self = this;
    let reader = new FileReader();
    reader.addEventListener("load", function(){
      self.uploadInCloudinary(reader.result)
    })
    reader.readAsDataURL(event.target.files[0])
  }

  createFormData(){
    this.formData = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
    })
  }
  onAddImageBtnClick(){
    this.formData.value.image = this.uploadedImage;
    this.formData.value.date = new Date().getTime();
    this.formData.value.favorite = false;
    this.db.addImage(this.formData.value, this.key)
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
