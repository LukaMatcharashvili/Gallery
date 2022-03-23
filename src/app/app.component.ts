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

  constructor(private auth:UserAuthService, private dialog:MatDialog){

  }
  ngOnInit(): void {
  }
  
  onUserLogOut(){
    this.auth.userLogOut()
  }
  onUserDeleteAlertOpen(){
    this.dialog.open(DeleteAlertComponent)
  }
}
