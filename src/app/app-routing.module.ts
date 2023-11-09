import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { UserSignupComponent } from './component/user-signup/user-signup.component';
import { UserListingComponent } from './component/user-listing/user-listing.component';
import { adminGuardGuard } from './service/auth-guards/admin-guard.guard';
import { userGuardGuard } from './service/auth-guards/user-guard.guard';
import { loginGuardGuard } from './service/auth-guards/login-guard.guard';

const routes: Routes = [
  {path:'login', component: UserLoginComponent, data:{isAdmin:false}, canActivate:[loginGuardGuard]},
  // {path:'admin/login', component: UserLoginComponent, data:{isAdmin:true}},
  {path:'signup', component: UserSignupComponent, data:{isAdmin:false, isEdit:false}},
  {path:'admin', component: UserListingComponent, canActivate:[adminGuardGuard]},
  {path:'admin/add-user', component: UserSignupComponent, data:{isAdmin:true, isEdit:false}, canActivate:[adminGuardGuard]},
  {path:'admin/edit-user', component: UserSignupComponent, data:{isAdmin:true, isEdit:true}, canActivate:[adminGuardGuard]},
  {path:'', component: UserHomeComponent, canActivate:[userGuardGuard]},
  {path:'**', redirectTo:'/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
