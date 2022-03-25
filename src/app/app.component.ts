import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  afterLoginDisplay!:boolean;
  
  constructor(
    private auth:UserAuthService,
    private dialog:MatDialog){}
  ngOnInit(): void {
    this.checkUserStatus();
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
}
