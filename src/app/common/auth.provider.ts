import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {environment} from '../../environments/environment';


//noinspection TsLint
@Component({
  moduleId: module.id,
  providers: [AuthHttp, AuthConfig]
})
export class AuthProvider extends AuthHttp {

  constructor(http: Http) {
    super(new AuthConfig({
      headerName: 'AuthHeader',
      headerPrefix: '',
      tokenName: environment.tokenName,
      tokenGetter: (() => localStorage.getItem(environment.tokenName)),
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: true,
      noTokenScheme: true
    }), http);
  }

}
