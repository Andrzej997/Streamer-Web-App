import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {authEndpoint} from '../../constants';
import {Observable} from 'rxjs';
import {UsersDTO} from '../../model/UsersDTO';
import {RegistrationDTO} from '../../model/RegistrationDTO';


@Injectable()
export class AuthService {

  headers: Headers = new Headers({'Content-Type': 'application/json'});
  options: RequestOptions = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  public login(username: String, password: String): Observable<boolean> {
    const url = `${authEndpoint}/login?username=${username}&password=${password}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public loginByEmail(email: String, password: String): Observable<boolean> {
    const url = `${authEndpoint}/login_by_email?email=${email}&password=${password}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public register(username: string, password: string, email: string): Observable<boolean> {
    const url = `${authEndpoint}/register`;
    let registrationDTO: RegistrationDTO = new RegistrationDTO(username, password, email);
    return this.http.post(url, JSON.stringify(registrationDTO), this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUserData(username: String): Observable<UsersDTO[]> {
    const url = `${authEndpoint}/user_data?username=${username}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public usernameExists(username: String): Observable<boolean> {
    const url = `${authEndpoint}/username?username=${username}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public checkEmailUnique(email: String): Observable<boolean> {
    const url = `${authEndpoint}/email/exists?email=${email}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
