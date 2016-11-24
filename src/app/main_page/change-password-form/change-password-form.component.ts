import {Component} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {AuthService} from '../../service/auth-service/auth.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent extends BaseComponent {

  private username: string;
  private oldPassword: string = '';
  private newPassword: string = '';

  private oldPasswordValid: boolean = true;
  private passwordChangeSuccess: boolean = false;

  constructor(private authService: AuthService) {
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
    this.authService.changePassword(this.username, this.newPassword)
      .subscribe((result) => this.passwordChangeSuccess = result,
        (error) => console.log(error));
  }

}
