import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);
  const storage= inject(StorageService);
  const _snack= inject(MatSnackBar);

  if(storage.getUser() !== null && storage.getToken() !== null && storage.isUserLoggedIn()){
    router.navigateByUrl("/");
    _snack.open("You don't have access to this page", "Close", {duration: 3000});
    return false; 
  } 
  else if(storage.getUser() === null && storage.getToken() === null){
    router.navigateByUrl("/login");
    _snack.open("You are not logged in. Please login to continue", "Close", {duration: 3000});
    return false;
  }

  return true;
};
