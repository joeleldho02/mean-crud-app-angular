import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  constructor(private store:Store, private storage:StorageService, private route:Router, private service:UserService){}
  logout(){
    if(confirm('Are you sure to logout?')){
      this.route.navigateByUrl('/login');
      this.storage.logout();
      this.service.logout();
    }
  }
}
