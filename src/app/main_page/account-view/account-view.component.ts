import {Component, ViewChild} from "@angular/core";
import {Router, NavigationExtras} from "@angular/router";
import {BaseComponent} from "../../base-component/base-component";
import {UsersDTO} from "../../model/users.dto";
import {AuthService} from "../../service/auth-service/auth.service";
import {SnackBarComponent} from "../../components/snack-bar/snack-bar.component";

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent extends BaseComponent {

  username: string;
  userData: UsersDTO;

  @ViewChild('snackAccoutView')
  private snack: SnackBarComponent;

  constructor(private authService: AuthService,
              private router: Router) {
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
        (error) => {
          this.snack._message = 'Error - user data not found';
          this.snack._timeout = 3000;
          this.snack._visible = true;
          this.snack.showSnackMessageError();
          console.log(error);
        },
        () => console.log(this.userData));
  }

  public onSaveData() {
    this.authService.updateUserData(this.userData).subscribe((value: boolean) => {
        if (value) {
          let params: NavigationExtras = {
            queryParams: {'showSnackBarTop': 'true', 'snackBarMessageTop': 'User data changed'}
          };
          this.router.navigate(['/top'], params);
        }
      },
      (error: any) => {
        this.snack._message = 'Error - user data not changed';
        this.snack._timeout = 3000;
        this.snack._visible = true;
        this.snack.showSnackMessageError();
        console.log(error);
      });
  }
}
