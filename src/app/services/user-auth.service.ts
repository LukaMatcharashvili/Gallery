import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private snackBar: MatSnackBar, private afAuth:AngularFireAuth, private db:AngularFireDatabase, private router:Router) { }
  
  userRegister(formData:any, email:any, password:any){
    let promise = this.afAuth.createUserWithEmailAndPassword(email,password);
    promise.then((user:any) => {
      this.saveCreatedAccount(formData, user, email);
    })
    promise.catch(function(error) {
      console.error(error)
    })
  }

  saveCreatedAccount(formData:any, user:any, email:any) {
    var node_id = user.user.uid;
 
    formData.node_id = node_id;
    formData.email = email;
    formData.created = new Date().toLocaleString();

     this.writeUserData(node_id, formData);
 }
  writeUserData(node_id:any, formData:any) {
    let self = this;
  this.db.database.ref('users/' + node_id).set(formData, (error:any) => {
      if (error) {
          console.error(error)
      } else {
          console.log('Saved. Please login');
          self.router.navigate(['/login'])
      }
  });
}
  userLogin(email:any, password:any){
    let self = this;
    const promise = this.afAuth.signInWithEmailAndPassword(email, password);
    promise.then(function (user:any) {
    let uid = user.user.uid;
    localStorage['uid'] = uid
    self.router.navigate(['/'])
  }).then((res) => {
    let key = localStorage['uid']
    this.db.object('users/' + key).update({
      password: password
    })
  })
    promise.catch(function(error:any) {
    console.error(error)
  });
  }
  userLogOut(){
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('uid');
      this.router.navigate(['login'])
    })
  }
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.snackBar.open("Password reset email sent, check your inbox.", "Ok!");
        this.router.navigate(['login'])
      })
      .catch((error) => {
        console.error(error);
      })
  }
 
  userDelete(){
    let user = this.afAuth.currentUser;
    let uid = localStorage['uid']
    this.db.database.ref('users/' + uid).remove()
    user.then((res) => {
      res?.delete()
      this.router.navigate(['register'])
      localStorage.removeItem("uid")
      this.snackBar.open("User has been deleted", "Ok!");

      this.db.database.ref('alboms/' + uid).remove()
      this.db.database.ref('images/' + uid).remove()
    })
  }

  userCheck(){
    if(localStorage['uid']){
      return true
    }else{
      return false
    }
  }
}
