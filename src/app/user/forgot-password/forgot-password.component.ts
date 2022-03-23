import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private auth:UserAuthService) { }

  ngOnInit(): void {
  }
  onUserPasswordResetBtnClick(email:any){
    this.auth.ForgotPassword(email)
  }
}
