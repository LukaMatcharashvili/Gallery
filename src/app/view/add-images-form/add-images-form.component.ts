import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private activatedRoute:ActivatedRoute, private db:DatabaseService) { }

  onImageValueChange(event:any){
    let self = this;
    let reader = new FileReader();
    reader.addEventListener("load", function(){
      self.uploadedImage = reader.result;
    })
    reader.readAsDataURL(event.target.files[0])
  }

  ngOnInit(): void {
    this.createFormData();
    this.activatedRoute.params.subscribe((params:Params) => {
      this.key = params['key']
    })
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
    this.db.addImage(this.formData.value, this.key)
  }
}
