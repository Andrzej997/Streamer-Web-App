import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {AuthService} from '../../service/auth-service/auth.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {environment} from '../../../environments/environment';
import {RecaptchaComponent} from 'ng-recaptcha';

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
  captcha: string;
  siteKey: string;

  @ViewChild('captchaInp')
  captchaInp: RecaptchaComponent;

  @Output() loginEvent = new EventEmitter<boolean>();
  @Output() loginErrorEvent = new EventEmitter<string>();

  constructor(private authSevice: AuthService,
              private router: Router) {
    super();
    this.userName = '';
    this.password = '';
    this.siteKey = environment.siteCaptchaKey;
  }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
  }

  onSubmit() {
    this.login();
  }

  onLoginComplete() {
    console.log('onLoginComplete' + this.loggedIn);
    this.loginEvent.emit(this._loggedIn);
  }

  onError(value: any) {
    this.errorMessage = value;
    console.log('onError' + this.errorMessage);
    this.loginErrorEvent.emit(this.errorMessage);
    this.captchaInp.reset();
  }

  login() {
    if (!this.userName || !this.password) {
      return;
    } else if (this.userName.indexOf('@') < 0) {
      let pass = encodeURIComponent(this.password);
      this.authSevice.login(this.userName, pass)
        .subscribe(res => {
            this._loggedIn = res != null && res.length > 0;
            if (this._loggedIn) {
              localStorage.setItem(environment.tokenName, res);
              localStorage.setItem('username', this.userName);
            } else {
              this.captchaInp.reset();
            }
          },
          error => this.onError(error),
          () => {
            this.onLoginComplete();
          }
        );
    } else {
      let pass = encodeURIComponent(this.password);
      this.authSevice.loginByEmail(this.userName, pass)
        .subscribe(res => {
            this._loggedIn = res != null && res.length > 0;
            if (this._loggedIn) {
              localStorage.setItem(environment.tokenName, res);
              localStorage.setItem('username', this.userName);
            } else {
              this.captchaInp.reset();
            }
          },
          error => this.onError(error),
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
