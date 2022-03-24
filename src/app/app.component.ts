import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { LoadingService } from './interceptor/loading.service';
import { DatabaseService } from './services/database.service';
import { UserAuthService } from './services/user-auth.service';
import { DeleteAlertComponent } from './user/delete-alert/delete-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gallery';
  panelOpenState = false;
  loading: boolean = false;
  afterLoginDisplay!:boolean;
  
  constructor(
    private auth:UserAuthService,
    private dialog:MatDialog,
    private loadingService:LoadingService){}
  ngOnInit(): void {
    this.checkUserStatus();
    this.subToLoadingService();
  }

  checkUserStatus(){
    let userCheck = this.auth.userCheck();
    this.afterLoginDisplay = !userCheck;
    this.auth.userStatusEmitter.subscribe((response) => {
      this.afterLoginDisplay = response;
    })
  }
  onUserLogOut(){
    this.auth.userLogOut()
  }
  onUserDeleteAlertOpen(){
    this.dialog.open(DeleteAlertComponent)
  }

  subToLoadingService() {
    this.loadingService.loadingEmitter
      .pipe(delay(0))
      .subscribe((loading: boolean) => {
        this.loading = loading;
      })
  }
}
