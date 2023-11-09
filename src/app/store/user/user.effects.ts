import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/service/user.service";
import { addUser, deleteUser, deleteUserSuccess, getUser, getUserFail, getUserSuccess, getUsers, getUsersFail, getUsersSuccess, loginUser, loginUserSuccess, putUser, putUserFail, putUserSuccess, uploadUserImg } from "./user.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { UserModel } from "src/app/model/userModel";
import { showalert } from "src/app/common/common.action";
import { Router } from "@angular/router";
import { StorageService } from "src/app/service/storage.service";

@Injectable()
export class UserEffects{
    constructor(
        private action$:Actions, 
        private service:UserService, 
        private route:Router, 
        private storage: StorageService){}

    _getUsers = createEffect(()=>{
        return this.action$.pipe(
            ofType(getUsers),
            exhaustMap((action)=>{
                return this.service.getAllUsers().pipe(
                    map((data)=>{                      
                        return getUsersSuccess({users: data});
                    }),
                    catchError((err)=>{
                        return of(getUsersFail({errMsg: err.message}))
                    })
                )
            })
        )
    });

    _getUser = createEffect(()=>{
        return this.action$.pipe(
            ofType(getUser),
            mergeMap((action)=>{
                return this.service.getUser(action.id).pipe(
                    map((data:any)=>{   
                        return getUserSuccess({user: data});
                    }),
                    catchError((err)=>{
                        return of(getUserFail({errMsg: err.message}))
                    })
                )
            })
        )
    });

    _postUser = createEffect(()=>{
        return this.action$.pipe(
            ofType(addUser),
            switchMap((action)=>{
                return this.service.addUser(action.inputData).pipe(
                    switchMap((data:any)=>{  
                        if(this.storage.isAdminLoggedIn()) 
                            this.route.navigate(['/admin']);
                        else{
                            this.route.navigate(['/login'])
                        }
                        return of(
                            getUserSuccess({user: data}),
                            showalert({message:'User registered succesfully!', resulttype:'pass'})
                        );
                    }),
                    catchError((err)=>{
                        return of(showalert({message:'Failed to register user!', resulttype:'fail'}));
                    })
                )
            })
        )
    });

    _putUser = createEffect(()=>{
        return this.action$.pipe(
            ofType(putUser),
            switchMap((action)=>{
                return this.service.updateUser(action.inputData).pipe(
                    switchMap((data:any)=>{   
                        console.log(data);  
                        this.route.navigate(['/admin']);                      
                        return of(
                            getUserSuccess({user: data}),
                            showalert({message:'User details updated succesfully!', resulttype:'pass'})
                        );
                    }),
                    catchError((err)=>{
                        return of(showalert({message:'Failed to update user!', resulttype:'fail'}));
                    })
                )
            })
        )
    });

    _deleteUser = createEffect(()=>{
        return this.action$.pipe(
            ofType(deleteUser),
            switchMap((action)=>{
                return this.service.deleteUser(action.id).pipe(
                    switchMap((data:any)=>{   
                        return of(
                            deleteUserSuccess({user: data}),
                            showalert({message:'User deleted succesfully!', resulttype:'pass'})
                        );
                    }),
                    catchError((err)=>{
                        return of(showalert({message:'Failed to delete user!', resulttype:'fail'}));
                    })
                )
            })
        )
    });

    _loginUser = createEffect(()=>{
        return this.action$.pipe(
            ofType(loginUser),
            switchMap((action)=>{
                return this.service.loginUser(action.inputData).pipe(
                    switchMap((data:{user:UserModel, token:string})=>{  
                        console.log(data);
                        
                        if(data.user != null){
                            if(data.user.isActive){
                                this.storage.saveToken(data.token);
                                this.storage.saveUser(data.user);                                

                                if(data.user.isAdmin)
                                    this.route.navigate(['/admin']);  
                                else        
                                    this.route.navigate(['/']); 
                                return of(
                                    loginUserSuccess({user:data.user}),
                                    showalert({ message:`${data.user.name} logged succesfully!`, resulttype: 'pass' }));
                            } else{                                
                                return of(showalert({ message: 'Sorry! You are blocked! Contact administrator for further details.', resulttype: 'fail' }));
                            }
                        } else {
                            return of(showalert({ message: 'Login Failed! Invalid credentials.', resulttype: 'fail' }));
                        }
                    }),
                    catchError((err)=>{
                        console.log(err);                        
                        return of(showalert({message:'Failed to login! '+ err?.error?.error, resulttype:'fail'}));
                    })
                )
            })
        )
    });

    _uploadUserImg = createEffect(()=>{
        return this.action$.pipe(
            ofType(uploadUserImg),
            switchMap((action)=>{
                return this.service.updateImage(action.id, action.image).pipe(
                    switchMap((data:any)=>{   
                        console.log(data);  
                        this.route.navigate(['/admin']);                      
                        return of(
                            getUserSuccess({user: data}),
                            showalert({message:'User details updated succesfully!', resulttype:'pass'})
                        );
                    }),
                    catchError((err)=>{
                        return of(showalert({message:'Failed to update user!', resulttype:'fail'}));
                    })
                )
            })
        )
    });
    
}