import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BASE_URL } from 'src/app/constData';
import { UserModel } from 'src/app/model/userModel';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { getuser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html', 
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy{
  
  user!: UserModel;
  file! : File;
  previewImgSrc:string ='';
  uploadForm = new FormGroup({
    userImg: new FormControl()
  });
  sub!:Subscription;
  imgUrl:string =''
  showUpload:boolean = false;

  constructor(private store:Store, private route:Router, private service:UserService, private storage:StorageService){}
  ngOnInit(): void {
    // this.sub = this.service.getCurrentUser().subscribe((data)=>{
    //   console.log(data);      
    //   this.user = data;
    // })

    // this.store.select(getuser).subscribe((data)=>{   
    //   console.log(data);         
    //   this.user = data;
    //   if(data.userPic)
    //     this.imgUrl = `${BASE_URL}/public/assets/users/${data?.userPic}`;
    // })

    this.user = this.storage.getUser() || {
      _id: "",
      name: "",
      email: "",
      password: "",
      isActive: true,
      phone: "",
      gender: "",
      userPic: ""
    };
    if(this.user.userPic)
        this.imgUrl = `${BASE_URL}/assets/users/${this.user?.userPic}`;
  }
  
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
  
  onSubmit(id:string){
    const formData = new FormData();
    if(this.file){
      formData.append('file', this.file, this.file.name);
      this.service.updateImage(id, formData).subscribe((e)=>{
        this.imgUrl = `${BASE_URL}/assets/users/${JSON.parse(e)?.userPic}`;
        this.previewImgSrc = '';
        // this.showUpload = false;
      })
    } else{
      alert('Please select an image to proceed!');
    }
  }

  onChange(event:any){
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.uploadForm.patchValue({
        userImg:this.file
      })
      this.uploadForm.get('userImg')?.updateValueAndValidity()
      // File Preview
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        this.previewImgSrc = reader.result as string;
      })
      reader.readAsDataURL(this.file);
    }
  }
  
}
