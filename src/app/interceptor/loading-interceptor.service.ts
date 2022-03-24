import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  constructor(private loading: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loading.setLoading(true, req.url);
    return next.handle(req)
    .pipe(catchError((err) => {
      this.loading.setLoading(false,req.url);
      return err;
    }))
    .pipe(map((item:any) => {
      if(item instanceof HttpResponse){
        this.loading.setLoading(false,req.url);
      }
      return item;
    }));
  }
}