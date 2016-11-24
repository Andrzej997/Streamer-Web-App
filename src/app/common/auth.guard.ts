import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras
} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (tokenNotExpired()) {
      return true;
    }
    let params: NavigationExtras = {
      queryParams: {'showLoginForm': true}
    };
    this.router.navigate(['/main'], params);
    return false;
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
