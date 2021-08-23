import { NotifyService } from './../common/notify/notify.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate{
  constructor(
    private router: Router,
    private authService : AuthService,
    private notifyService : NotifyService,
    ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.isLoggedIn()){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }


  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let roles: string[] = next.data['roles'];

    if(this.authService.isLoggedIn()){
      if(!this.allowAccess(roles))
        return false;
      else
        return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  
  allowAccess(allowedRoles: string[]) {
    let role = this.authService.getRole();
    if (!allowedRoles || !allowedRoles.length) return true;

    const canAccess = !!allowedRoles.find(x => x === role);
    if (!canAccess) 
    this.notifyService.notifyError("Você não possui permissão para acesso");
    return canAccess;
  }

}
