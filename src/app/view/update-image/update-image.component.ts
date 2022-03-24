import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  albomKey:string = "";
  imageKey:string = "";
  formData!:any;
  imageUrl:any = "";
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private db:DatabaseService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params) => {
      this.albomKey = params['albomKey'];
      this.imageKey = params['imageKey']
    })
    this.db.getImage(this.albomKey, this.imageKey).subscribe((response:any) => {
      this.createFormData(response)
      this.imageUrl = response.image;
    })
  }
  onImageValueChange(event:any){
    let self = this;
    let reader = new FileReader();
    reader.addEventListener("load", function(){
      self.imageUrl = reader.result;
    })
    reader.readAsDataURL(event.target.files[0])
  }

 createFormData(response:any){
  this.formData = new FormGroup({
    title: new FormControl(response.title),
    description: new FormControl(response.description),
    date: new FormControl(new Date().getTime()),
    favorite: new FormControl(response.favorite)
  })
 }

 onImageUpdateBtnClick(){
    this.formData.value.image = this.imageUrl;
    this.db.imageUpdate(this.formData.value, this.albomKey, this.imageKey)
    this.router.navigate(['image-area', this.albomKey])
 }
}
