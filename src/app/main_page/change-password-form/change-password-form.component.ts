import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {AuthService} from '../../service/auth-service/auth.service';
import {Router, NavigationExtras} from '@angular/router';
import {ChangePasswordDTO} from '../../model/change.password.dto';
import {SnackBarComponent} from '../../components/snack-bar/snack-bar.component';
import {RecaptchaComponent} from 'ng-recaptcha';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent extends BaseComponent {

  username: string;
  oldPassword: string = '';
  newPassword: string = '';
  repeatPassword: string = '';

  oldPasswordValid: boolean = true;
  passwordChangeSuccess: boolean = false;

  captcha: string;
  siteKey: string;

  @ViewChild('captchaInp')
  captchaInp: RecaptchaComponent;

  @ViewChild('snackChangePassword')
  snack: SnackBarComponent;

  constructor(private authService: AuthService,
              private router: Router) {
    super();
    this.siteKey = environment.siteCaptchaKey;
  }

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  resolved(captchaResponse: string) {
  }

  public validateOldPassword() {
    this.authService.validateOldPassword(this.username, this.oldPassword)
      .subscribe((result) => this.oldPasswordValid = result,
        (error) => console.log(error));
  }

  public onChangePassword() {
    let changePasswordDTO: ChangePasswordDTO = new ChangePasswordDTO();
    changePasswordDTO._newPassword = this.newPassword;
    changePasswordDTO._oldPassword = this.oldPassword;
    changePasswordDTO._username = this.username;
    this.authService.changePassword(changePasswordDTO)
      .subscribe((result) => {
          this.passwordChangeSuccess = result;
          let params: NavigationExtras = {
            queryParams: {'showSnackBarTop': 'true', 'snackBarMessageTop': 'Password changed'}
          };
          this.router.navigate(['/top'], params);
        },
        (error: any) => {
          this.snack._message = 'Error - password not changed';
          this.snack._timeout = 3000;
          this.snack._visible = true;
          this.captchaInp.reset();
          this.snack.showSnackMessageError();
          console.log(error);
        });
  }

}
