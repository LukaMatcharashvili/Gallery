import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit {

  constructor(private auth:UserAuthService) { }

  ngOnInit(): void {
  }
  onUserDeleteBtnClick(){
    this.auth.userDelete()
  }
}
