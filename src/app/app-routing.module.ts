import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from './guards/guard.service';
import { LoginGuardService } from './guards/login-guard.service';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { LoginPgComponent } from './user/login-pg/login-pg.component';
import { RegisterPgComponent } from './user/register-pg/register-pg.component';
import { AddImagesFormComponent } from './view/add-images-form/add-images-form.component';
import { AlbomsAreaComponent } from './view/alboms-area/alboms-area.component';
import { FavoritesComponent } from './view/favorites/favorites.component';
import { HomePgComponent } from './view/home-pg/home-pg.component';
import { ImagesAreaComponent } from './view/images-area/images-area.component';
import { UpdateImageComponent } from './view/update-image/update-image.component';

const routes: Routes = [
  {path:'',component:HomePgComponent},
  {path:'login',canActivate:[LoginGuardService],component:LoginPgComponent},
  {path:'register',canActivate:[LoginGuardService],component:RegisterPgComponent},
  {path:'forgot-password',canActivate:[LoginGuardService],component:ForgotPasswordComponent},
  {path:'albom-area', canActivate:[GuardService], component:AlbomsAreaComponent},
  {path:'image-area/:key', canActivate:[GuardService], component:ImagesAreaComponent},
  {path:'add-image/:key',  canActivate:[GuardService], component:AddImagesFormComponent},
  {path:'update-image/:albomKey/:imageKey', canActivate:[GuardService], component:UpdateImageComponent},
  {path:'favorites',canActivate:[GuardService], component:FavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
