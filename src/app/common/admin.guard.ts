import {Injectable} from '@angular/core';
import {Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import {AuthService} from '../service/auth-service/auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAdmin().map(value => {
      return (value && tokenNotExpired(environment.tokenName));

    });
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }
}
