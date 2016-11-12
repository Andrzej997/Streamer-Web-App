import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public active: boolean;
  public logedIn: boolean = false;

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
    this.active = false;
  }

  setActive() {
    if (!this.logedIn) {
      this.active = true;
    }
  }

  onSubmit() {
    this.login();
    this.active = false;
  }

  onRegisterClick() {
    this.registerMode = true;
  }

  onLoginClick() {
    this.registerMode = false;
  }

  login() {
    if (!this.userName || !this.password) {
      return;
    } else if (this.userName.indexOf('@') < 0) {
      this.authSevice.login(this.userName, this.password)
        .subscribe(success => this.logedIn = success,
          error => this.errorMessage = <any>error,
          () => this.active = false);
      console.log(this.logedIn);
      console.log(this.active);
    } else {
      this.authSevice.loginByEmail(this.userName, this.password)
        .subscribe(success => this.logedIn = success,
          error => this.errorMessage = <any>error,
          () => this.active = false);
    }
  }

}
