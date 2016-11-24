import {Component} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {UsersDTO} from '../../model/users.dto';
import {AuthService} from '../../service/auth-service/auth.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent extends BaseComponent {

  username: string;
  userData: UsersDTO;

  constructor(private authService: AuthService) {
    super();
    this.userData = new UsersDTO();
    this.userData.name = '';
    this.userData.surname = '';
    this.userData.nationality = '';
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.authService.getUserData(this.username)
      .subscribe((userdata) => this.userData = <UsersDTO>userdata,
        (error) => console.log(error),
        () => console.log(this.userData));
  }

  public onSaveData() {
    this.authService.updateUserData(this.userData).subscribe();
  }
}
