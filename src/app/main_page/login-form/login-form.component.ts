import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private _loggedIn: boolean = false;

  errorMessage: string;
  registerMode: boolean = false;
  userName: string;
  password: string;

  constructor(private authSevice: AuthService,
              private router: Router) {
    this.userName = '';
    this.password = '';
  }

  ngOnInit() {
  }

  onSubmit() {
    this.login();
  }

  login() {
    if (!this.userName || !this.password) {
      return;
    } else if (this.userName.indexOf('@') < 0) {
      this.authSevice.login(this.userName, this.password)
        .subscribe(success => this._loggedIn = success,
          error => this.errorMessage = <any>error
        );
    } else {
      this.authSevice.loginByEmail(this.userName, this.password)
        .subscribe(success => this._loggedIn = success,
          error => this.errorMessage = <any>error
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
