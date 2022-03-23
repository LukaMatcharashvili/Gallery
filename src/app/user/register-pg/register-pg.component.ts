import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register-pg',
  templateUrl: './register-pg.component.html',
  styleUrls: ['./register-pg.component.css']
})
export class RegisterPgComponent implements OnInit {
  hide = true;
  formData:any = {};

  constructor(private auth:UserAuthService) { }

  ngOnInit(): void {
    this.createFormData()
  }
  createFormData(){
    this.formData = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  onUserRegister(){
    let data = this.formData.value;
    let email = data.email;
    let password = data.password;
    this.auth.userRegister(data, email, password)
  }
}
