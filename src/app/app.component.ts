import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {title} from './constants';
import {BaseComponent} from './base-component/base-component';
import {SnackBarComponent} from "./components/snack-bar/snack-bar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = `${title}`;
  showLoginForm: boolean;
  private _loggedIn: boolean;
  menuVisible: boolean;
  mainContentStyle: string;
  menuStyle: string;
  snackMessage: string;
  @ViewChild(SnackBarComponent)
  private snack: SnackBarComponent;

  constructor(private router: Router) {
    super();
  }

  public ngOnInit() {
    this.showLoginForm = false;
    this.loggedIn = false;
    this.menuVisible = false;
    this.menuStyle = 'width: 0%; float: left; margin-left: 0px';
    this.mainContentStyle = 'width: 100%; float: left margin-left: 0px';
    this.snackMessage = '';
  }

  public onMenuShowHideClick() {
    this.menuVisible = !this.menuVisible;
    this.getMainStyle();
  }

  public onLoginClick() {
    this.showLoginForm = !this.showLoginForm;
  }

  public getMainStyle() {
    var divMenu = document.getElementById('divMenu');
    var divMainPage = document.getElementById('divMainPage');
    if (this.menuVisible) {
      divMenu.style.width = '15%';
      divMainPage.style.marginLeft = '15%';
    } else {
      divMenu.style.width = '0';
      divMainPage.style.marginLeft = '0';
    }
  }

  public onLoginChange(value: boolean) {
    console.log('parent' + value);
    this.snackMessage = 'Login successful';
    this.snack.showSnackMessage();
    this.loggedIn = value;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
