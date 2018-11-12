import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {AuthService} from '../../service/auth-service/auth.service';
import {UsersDTO} from '../../model/users.dto';
import {AssuranceModalComponent} from '../../components/assurance-modal/assurance-modal.component';

@Component({
  selector: 'app-manage-users-view',
  templateUrl: './manage-users-view.component.html',
  styleUrls: ['./manage-users-view.component.css']
})
export class ManageUsersViewComponent extends BaseComponent {

  public usersDTO: UsersDTO[];
  private userToDelete: UsersDTO;

  @ViewChild('assuranceModalUsers')
  private assuranceModal: AssuranceModalComponent;

  constructor(private authService: AuthService) {
    super();
    this.usersDTO = [];
  }

  public ngOnInit() {
    this.authService.getAllUsers().subscribe((value: UsersDTO[]) => {
      this.usersDTO = value;
    });
  }

  public onRemoveClick(user: UsersDTO): void {
    this.showAssurance(user);
  }

  public onUserDeleteConfirm(value: boolean): void {
    if (this.userToDelete == null || !value) {
      return;
    }
    this.authService.deleteUser(this.userToDelete._userId).subscribe((value: boolean) => {
      if (value) {
        this.refreshList();
      }
    });
  }

  public refreshList(): void {
    this.authService.getAllUsers().subscribe((value: UsersDTO[]) => {
      this.usersDTO = value;
    });
  }

  public showAssurance(selectedUser: UsersDTO): void {
    this.userToDelete = selectedUser;
    this.assuranceModal.show();
  }

}
