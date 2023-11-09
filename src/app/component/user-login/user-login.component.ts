import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { showalert } from 'src/app/common/common.action';
import { LoginModel } from 'src/app/model/loginModel';
import { loginUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  
  isLoading:boolean = false;
  isAdmin:boolean = false;
  sub!:Subscription;

  loginCred!:LoginModel;
  loginForm = new FormGroup({
    email : new FormControl('', [ Validators.required, Validators.pattern(/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/)]),
    password : new FormControl('', [ Validators.required])
  })
  
  constructor(private store:Store, private route:Router, private actRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.sub = this.actRoute?.data.subscribe((data)=>{
      this.isAdmin = data?.['isAdmin'];
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  submit(){
    if(this.loginForm.valid){
      this.store.dispatch(loginUser({inputData: this.loginForm.value as LoginModel}));  
    }
    else{
      this.store.dispatch(showalert({message:'Please enter login credentials to continue!', resulttype:'fail'}));
    }
  }
}
