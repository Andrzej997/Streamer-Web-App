import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {authEndpoint} from '../../constants';
import {Observable} from 'rxjs';
import {AbstractService} from '../abstract-service/abstract.service';
import {UsersDTO} from '../../model/users.dto';
import {RegistrationDTO} from '../../model/registration.dto';
import {ChangePasswordDTO} from '../../model/change.password.dto';


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

  public changePassword(changePasswordDTO: ChangePasswordDTO): Observable<boolean> {
    const url = `${authEndpoint}/auth/password/change`;
    return this.performPost(url, JSON.stringify(changePasswordDTO));
  }

  public isAdmin(): Observable<boolean> {
    const url = `${authEndpoint}/admin/`;
    return this.performGet(url);
  }

  public getAllUsers(): Observable<UsersDTO[]> {
    const url = `${authEndpoint}/admin/users`;
    return this.performGet(url);
  }

  public deleteUser(userId: number): Observable<boolean> {
    const url = `${authEndpoint}/admin/delete/user?id=${userId}`;
    return this.performDelete(url);
  }

}
