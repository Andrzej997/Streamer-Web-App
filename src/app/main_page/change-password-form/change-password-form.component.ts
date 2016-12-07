import {Component, ViewChild} from "@angular/core";
import {BaseComponent} from "../../base-component/base-component";
import {AuthService} from "../../service/auth-service/auth.service";
import {Router, NavigationExtras} from "@angular/router";
import {ChangePasswordDTO} from "../../model/change.password.dto";
import {SnackBarComponent} from "../../components/snack-bar/snack-bar.component";

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent extends BaseComponent {

  private username: string;
  private oldPassword: string = '';
  private newPassword: string = '';
  private repeatPassword: string = '';

  private oldPasswordValid: boolean = true;
  private passwordChangeSuccess: boolean = false;

  @ViewChild('snackChangePassword')
  private snack: SnackBarComponent;

  constructor(private authService: AuthService,
              private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');
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
          this.snack.showSnackMessageError();
          console.log(error);
        });
  }

}
