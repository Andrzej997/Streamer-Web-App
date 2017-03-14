import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp, AuthConfig} from "angular2-jwt";


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
      tokenName: 'id_token',
      tokenGetter: (() => localStorage.getItem('id_token')),
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: true,
      noTokenScheme: true
    }), http);
  }

}
