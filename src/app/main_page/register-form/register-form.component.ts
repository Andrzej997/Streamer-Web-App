import {Component, Output, EventEmitter} from "@angular/core";
import {AuthService} from "../../service/auth-service/auth.service";
import {Router, NavigationExtras} from "@angular/router";
import {BaseComponent} from "../../base-component/base-component";

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['register-form.component.css'],
})
export class RegisterFormComponent extends BaseComponent {

  username: string = '';
  password: string = '';
  password2: string = '';
  email: string = '';

  registered: boolean = false;
  usernameExists: boolean = false;
  emailNotUnique: boolean = false;

  @Output() onRegisteredChange = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
              private router: Router) {
    super();
  }


  public register() {
    this.authService.register(this.username, this.password, this.email)
      .subscribe((result) => {
          this.onRegister(result);
        },
        (error) => console.log(error)
      );
  }

  onRegister(result: string) {
    this.registered = result != null && result.length > 0;
    this.onRegisteredChange.emit(this.registered);
    if (this.registered) {
      localStorage.setItem('id_token', result);
      localStorage.setItem('username', this.username);
      let params: NavigationExtras = {
        queryParams: {'showSnackBarTop': 'true', 'snackBarMessageTop': 'Registration successful'}
      };
      this.router.navigate(['/top'], params);
    }
  }


  public checkUsernameExists() {
    this.authService.usernameExists(this.username)
      .subscribe(success => this.usernameExists = <boolean>success,
        (error) => console.log(error));
  }

  public checkEmailUnique() {
    this.authService.checkEmailUnique(this.email)
      .subscribe(success => this.emailNotUnique = <boolean>success,
        error => console.log(error));
  }



}
