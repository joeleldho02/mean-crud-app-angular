import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { inject } from '@angular/core';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  
  const router= inject(Router);
  const storage= inject(StorageService);

  if(storage.getUser()!==null && storage.getToken()!==null && storage.isAdminLoggedIn()){
    router.navigateByUrl("/admin")
    return false; 
  }
  else if(storage.getUser()!==null && storage.getToken()!==null && storage.isUserLoggedIn()){
    router.navigateByUrl("/")
    return false;
  }

  return true;
};
