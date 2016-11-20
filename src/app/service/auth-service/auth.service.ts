import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {authEndpoint} from '../../constants';
import {Observable} from 'rxjs';
import {UsersDTO} from '../../model/UsersDTO';
import {RegistrationDTO} from '../../model/RegistrationDTO';
import {AbstractService} from '../abstract-service/abstract.service';


@Injectable()
export class AuthService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public login(username: String, password: String): Observable<string> {
    const url = `${authEndpoint}/noauth/login?username=${username}&password=${password}`;
    return this.performGet(url);
  }

  public loginByEmail(email: String, password: String): Observable<string> {
    const url = `${authEndpoint}/noauth/login_by_email?email=${email}&password=${password}`;
    return this.performGet(url);
  }

  public register(username: string, password: string, email: string): Observable<string> {
    const url = `${authEndpoint}/noauth/register`;
    let registrationDTO: RegistrationDTO = new RegistrationDTO(username, password, email);
    return this.performPost(url, JSON.stringify(registrationDTO), this.options);
  }

  public getUserData(username: String): Observable<UsersDTO> {
    const url = `${authEndpoint}/auth/user_data?username=${username}`;
    return this.performGet(url);
  }

  public usernameExists(username: String): Observable<boolean> {
    const url = `${authEndpoint}/noauth/username?username=${username}`;
    return this.performGet(url);
  }

  public checkEmailUnique(email: String): Observable<boolean> {
    const url = `${authEndpoint}/noauth/email/exists?email=${email}`;
    return this.performGet(url);
  }

  public updateUserData(usersDTO: UsersDTO): Observable<boolean> {
    const url = `${authEndpoint}/auth/update/user_data`;
    return this.performPut(url, JSON.stringify(usersDTO), this.options);
  }

  public validateOldPassword(username: string, password: string): Observable<boolean> {
    const url = `${authEndpoint}/auth/valid/password?username=${username}&password=${password}`;
    return this.performGet(url);
  }

  public changePassword(username: string, password: string): Observable<boolean> {
    const url = `${authEndpoint}/auth/password/change`;
    var params: any = {username: username, password: password};
    return this.performPost(url, JSON.stringify(params));
  }

}
