import {Component, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../service/auth-service/auth.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent extends BaseComponent {

  private _loggedIn: boolean = false;

  errorMessage: string;
  registerMode: boolean = false;
  userName: string;
  password: string;

  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(private authSevice: AuthService,
              private router: Router) {
    super();
    this.userName = '';
    this.password = '';
  }

  onSubmit() {
    this.login();
  }

  onLoginComplete() {
    console.log('onLoginComplete' + this.loggedIn);
    this.loginEvent.emit(this._loggedIn);
  }

  login() {
    if (!this.userName || !this.password) {
      return;
    } else if (this.userName.indexOf('@') < 0) {
      this.authSevice.login(this.userName, this.password)
        .subscribe(success => this._loggedIn = success,
          error => this.errorMessage = <any>error,
          () => {
            this.onLoginComplete();
          }
        );
    } else {
      this.authSevice.loginByEmail(this.userName, this.password)
        .subscribe(success => this._loggedIn = success,
          error => this.errorMessage = <any>error,
          () => {
            this.onLoginComplete();
          }
        );
    }
  }


  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
