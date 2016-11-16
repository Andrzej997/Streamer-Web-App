import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  public canActivate() {
    if (tokenNotExpired()) {
      return true;
    }
    this.router.navigate(['/', {showLoginForm: true}]);
  }
}
