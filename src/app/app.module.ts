import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { HomePgComponent } from './view/home-pg/home-pg.component';
import { RegisterPgComponent } from './user/register-pg/register-pg.component';
import { LoginPgComponent } from './user/login-pg/login-pg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { DeleteAlertComponent } from './user/delete-alert/delete-alert.component';
import { AlbomsAreaComponent } from './view/alboms-area/alboms-area.component';
import { ImagesAreaComponent } from './view/images-area/images-area.component';
import { AddAlbomFormComponent } from './view/add-albom-form/add-albom-form.component';
import { AddImagesFormComponent } from './view/add-images-form/add-images-form.component';
import { InspectImageComponent } from './view/inspect-image/inspect-image.component';
import { UpdateImageComponent } from './view/update-image/update-image.component';
import { ImageDeleteAlertComponent } from './view/image-delete-alert/image-delete-alert.component';
import { DeleteAlbomAlertComponent } from './view/delete-albom-alert/delete-albom-alert.component';
import { FavoritesComponent } from './view/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePgComponent,
    RegisterPgComponent,
    LoginPgComponent,
    ForgotPasswordComponent,
    DeleteAlertComponent,
    AlbomsAreaComponent,
    ImagesAreaComponent,
    AddAlbomFormComponent,
    AddImagesFormComponent,
    InspectImageComponent,
    UpdateImageComponent,
    ImageDeleteAlertComponent,
    DeleteAlbomAlertComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
