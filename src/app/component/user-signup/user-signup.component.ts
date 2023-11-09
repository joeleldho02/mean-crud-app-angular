import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { showalert } from 'src/app/common/common.action';
import { EditUserModel, UserModel } from 'src/app/model/userModel';
import { addUser, getUser, putUser } from 'src/app/store/user/user.actions';
import { getuser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit, OnDestroy {

  signupForm = new FormGroup({
    id : new FormControl(''),
    name : new FormControl('', [ Validators.required, Validators.minLength(3)]),
    phone : new FormControl('', [ Validators.required, Validators.minLength(10), Validators.pattern(/^\d{10}$/)]),
    gender : new FormControl('female', [ Validators.required]),
    email : new FormControl('', [ Validators.required, Validators.pattern(/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/)]),
    password : new FormControl(''),
    repassword : new FormControl(''),
    isActive : new FormControl(true),
    isAdmin : new FormControl(false)
  });  

  isEdit:boolean = false;
  isAdmin:boolean = false;
  isLoading:boolean = false;
  sub!:Subscription;
  user!:UserModel;

  constructor(private store: Store, private actRoute:ActivatedRoute, private route:Router, private _snack:MatSnackBar){}

  ngOnInit(): void {    
    this.sub = this.actRoute?.data.subscribe((data)=>{
      this.isAdmin = data?.['isAdmin'];
      this.isEdit = data?.['isEdit'];
    });

    if(this.isAdmin && this.isEdit){
      this.store.select(getuser).subscribe((data)=>{
        this.user = data;
        this.signupForm.patchValue({
          id: data._id,
          name: data.name,
          phone: data.phone,
          email: data.email,
          gender: data.gender,
          isActive: data.isActive
        })
      })
    }    
    this.signupForm.get('password')?.setValidators(this.passwordValidator(this.signupForm));
    this.signupForm.get('repassword')?.setValidators(this.passwordValidator(this.signupForm));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  submit(){
    if(this.signupForm.valid){
      if (this.signupForm.value.password === this.signupForm.value.repassword && !this.isAdmin) {
        // this.isLoading = true;
        const obj:UserModel = {
            _id:this.signupForm.value.id as string,
            name: this.signupForm.value.name as string,
            password: this.signupForm.value.password as string,
            email: this.signupForm.value.email as string,
            phone: this.signupForm.value.phone as string,
            gender: this.signupForm.value.gender as string, 
            isAdmin: false,
            isActive: true  
        }      
        console.log('signupuser');    
        this.store.dispatch(addUser({inputData:obj}));
        this.route.navigate(['/']);   
      } 
      else if(this.isAdmin && !this.isEdit){
        // this.isLoading = true;
        const obj:UserModel = {
          _id: '',
          name: this.signupForm.value.name as string,
          password: this.signupForm.value.password as string,
          email: this.signupForm.value.email as string,
          phone: this.signupForm.value.phone as string,
          gender: this.signupForm.value.gender as string, 
          isActive: true, 
          isAdmin: false,
        }      
        console.log('adduser');    
        this.store.dispatch(addUser({inputData:obj}));  
      } 
      else if(this.isAdmin && this.isEdit){
        // this.isLoading = true;
        const obj:EditUserModel = {
          _id: this.signupForm.value.id as string,
          name: this.signupForm.value.name as string,
          email: this.signupForm.value.email as string,
          phone: this.signupForm.value.phone as string,
          gender: this.signupForm.value.gender as string, 
          isAdmin: false,
          isActive: this.signupForm.value.isActive as boolean  
        }      
        console.log('edituser');        
        this.store.dispatch(putUser({inputData:obj}));  
      }
      else{
        this.store.dispatch(showalert({message:'Entered passwords do not match!', resulttype:'fail'}));
      }
    } else {      
        this.store.dispatch(showalert({message:'Please enter details to continue!', resulttype:'fail'}));
    }
  }


  //custom validation
  passwordValidator(form: FormGroup): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {      
      const noValue = !this.isAdmin ? !(control.value) : false
      return noValue ? {required: control.value, minlength: 4, pattern:/^[a-zA-Z0-9!@#$%^&*]{4,16}$/} : null;
    };
  }
}
