import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login-pg',
  templateUrl: './login-pg.component.html',
  styleUrls: ['./login-pg.component.css']
})
export class LoginPgComponent implements OnInit {
  hide = true;
  formData:any = {}
  constructor(private auth:UserAuthService) { }

  ngOnInit(): void {
    this.createFormData()
  }
  createFormData(){
    this.formData = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }
  onUserLogIn(){
    let email = this.formData.value.email;
    let password = this.formData.value.password;
    this.auth.userLogin(email, password)
  }
}
