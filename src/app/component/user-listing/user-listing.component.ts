import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BASE_URL } from 'src/app/constData';
import { UserModel } from 'src/app/model/userModel';
import { addUser, deleteUser, getUser, getUsers } from 'src/app/store/user/user.actions';
import { getUserList } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit{

  users: UserModel[] = [];
  filteredList: UserModel[] = [];
  temp: UserModel[] = [];
  imgUrl: string = BASE_URL;

  constructor(private store:Store, private route: Router){}

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store.select(getUserList).subscribe((data)=>{      
      this.users = data;
    })
  }
  
  addUser(){
    this.route.navigate(['/admin/add-user']);
  }

  editUser(id:string){
    this.store.dispatch(getUser({id}));
    this.route.navigate(['/admin/edit-user']);
  }

  deleteUser(id:string, name:string){
    if(confirm(`Are you sure to delete ${name}?`))
      this.store.dispatch(deleteUser({id}));
  }

  searchUser(text:string){
    this.store.select(getUserList).subscribe((data)=>{      
      this.users = data;
    });
    this.filteredList = this.users.filter((user)=>{return user.name.toLowerCase().includes(text.toLowerCase())});
    this.users = this.filteredList;
  }
  
}
