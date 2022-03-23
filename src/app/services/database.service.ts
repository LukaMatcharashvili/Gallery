import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  albomsRef!: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private router:Router) {
    let uid = localStorage['uid']
    this.albomsRef = this.db.list('alboms/' + uid);
  }
  addAlbom(formData: any) {
    return this.albomsRef.push(formData);
  }

  getUsersAllAlbom() {
    let uid = localStorage['uid']
    let alboms:AngularFireList<any> = this.db.list('alboms/' + uid);
    return alboms
    .snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((c) => ({ key: c.payload.key, title: c.payload.val().title, image: c.payload.val().image, date: c.payload.val().date }))
      )
    );
  }

  getAlbomsAllImages(key:any){
    let uid = localStorage['uid'];
    let imagesRef:AngularFireList<any> = this.db.list('images/' + uid + '/' + key);
    return imagesRef.snapshotChanges()
    .pipe(
      map((changes) =>
      changes.map((c) => ({ key: c.payload.key, title: c.payload.val().title, description: c.payload.val().description, image: c.payload.val().image, date: c.payload.val().date }))
      )
    )
  }

  addImage(formData:any, key:string){
    let uid = localStorage['uid']
    let imagesRef = this.db.list('images/' + uid + "/" + key);
    imagesRef.push(formData)
    this.router.navigate(['image-area', key])
  }

  deleteAlbom(key:string){
    let uid = localStorage['uid'];
    let albomByKeyRef = this.db.object('alboms/' + uid + '/' + key);
    let imagesByKeyRef = this.db.list('images/' + uid + '/' + key);
    albomByKeyRef.remove();
    imagesByKeyRef.remove();
  }

  deleteImage(albomKey:string, imageKey:string){
    let uid = localStorage['uid'];
    let imageByKeyRef = this.db.object('images/' + uid + '/' + albomKey + '/' + imageKey);
    imageByKeyRef.remove() 
  }

  getImage(albomKey:string, imageKey:string){
    let uid = localStorage['uid'];
    let imageByKeyRef = this.db.object('images/' + uid + '/' + albomKey + '/' + imageKey);
    return imageByKeyRef.valueChanges()
  }

  imageUpdate(formData:any,albomKey:string, imageKey:string){
    let uid = localStorage['uid'];
    let imageByKeyRef = this.db.object('images/' + uid + '/' + albomKey + '/' + imageKey);
    return imageByKeyRef.update(formData)
  }
}
