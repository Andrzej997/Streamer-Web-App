import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  username: string = '';
  password: string = '';
  password2: string = '';
  email: string = '';

  registered: boolean = false;
  usernameExists: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public register() {
    this.authService.register(this.username, this.password, this.email)
      .subscribe(success => this.registered = success,
        (error) => console.log(error));
  }

  public checkUsernameExists() {
    this.authService.usernameExists(this.username)
      .subscribe(success => this.usernameExists = <boolean>success,
        (error) => console.log(error));
    console.log(<boolean>this.usernameExists);
  }

}
