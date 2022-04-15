import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CloudinaryService {

  constructor(private http:HttpClient) { }

  uploadInCloudinary(file:any){
    let url = `${environment.cloudinaryBaseUrl}`;
    let headers = new HttpHeaders()
    .set('X-Requested-With', 'XMLHttpRequest')
    let fd = new FormData();
    fd.append("upload_preset", "pv5ptgle");
    fd.append('file', file);
    return this.http.post(url, fd, {headers:headers})
  }

}
