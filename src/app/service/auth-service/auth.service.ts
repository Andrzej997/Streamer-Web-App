import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {authEndpoint} from '../../constants';
import {Observable} from 'rxjs';
import {UsersDTO} from '../../model/UsersDTO';
import {RegistrationDTO} from '../../model/RegistrationDTO';
import {AbstractService} from '../abstract-service/abstract.service';


@Injectable()
export class AuthService extends AbstractService {

  constructor(protected http: Http) {
    super(http);
  }

  public login(username: String, password: String): Observable<boolean> {
    const url = `${authEndpoint}/login?username=${username}&password=${password}`;
    return this.performGet(url);
  }

  public loginByEmail(email: String, password: String): Observable<boolean> {
    const url = `${authEndpoint}/login_by_email?email=${email}&password=${password}`;
    return this.performGet(url);
  }

  public register(username: string, password: string, email: string): Observable<boolean> {
    const url = `${authEndpoint}/register`;
    let registrationDTO: RegistrationDTO = new RegistrationDTO(username, password, email);
    return this.performPost(url, JSON.stringify(registrationDTO), this.options);
  }

  public getUserData(username: String): Observable<UsersDTO> {
    const url = `${authEndpoint}/user_data?username=${username}`;
    return this.performGet(url);
  }

  public usernameExists(username: String): Observable<boolean> {
    const url = `${authEndpoint}/username?username=${username}`;
    return this.performGet(url);
  }

  public checkEmailUnique(email: String): Observable<boolean> {
    const url = `${authEndpoint}/email/exists?email=${email}`;
    return this.performGet(url);
  }

  public updateUserData(usersDTO: UsersDTO): Observable<boolean> {
    const url = `${authEndpoint}/update/user_data`;
    return this.performPut(url, JSON.stringify(usersDTO), this.options);
  }

}
