import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../model/loginModel';
import { Observable } from 'rxjs';
import { CustomToken } from '../model/tokenModel';
import { BASE_URL } from '../constData';
import { UserModel } from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  
  getAllUsers(){
    return this.http.get<UserModel[]>(`${BASE_URL}/users`);
  }
  loginUser(loginData:LoginModel):Observable<CustomToken> {
    return this.http.post<CustomToken>(`${BASE_URL}/login`, loginData)
  }
  getUser(id:String){     
    return this.http.get(`${BASE_URL}/user/${id}`);
  }
  addUser(user:UserModel):Observable<CustomToken>{   
    return this.http.post<CustomToken>(`${BASE_URL}/user`, user);
  }
  updateUser(data:UserModel){
    return this.http.put(`${BASE_URL}/user/${data._id}`, data);
  }
  deleteUser(id:String){
    return this.http.delete(`${BASE_URL}/user/${id}`);
  }

  getCurrentUser():Observable<UserModel>{
    return this.http.get<UserModel>(`${BASE_URL}/current-user`);
  }
  updateImage(id:string, formData: FormData): Observable<string> {
    return this.http.post(`${BASE_URL}/update-image/${id}`, formData,{
      responseType:'text'
    }); 
  }

  logout(){
    return this.http.get(`${BASE_URL}/logout`);
 }
}
