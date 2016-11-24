import {Component, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {title} from './constants';
import {BaseComponent} from './base-component/base-component';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {Observable}         from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = `${title}`;
  showLoginForm: boolean = false;
  private _loggedIn: boolean;
  menuVisible: boolean;
  mainContentStyle: string;
  menuStyle: string;
  snackMessage: string;
  @ViewChild(SnackBarComponent)
  private snack: SnackBarComponent;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    super();
  }

  public ngOnInit() {
    let showLogin: Observable<string> = this.route.queryParams.map(params => params['showLoginForm'] || 'false');
    showLogin.subscribe((value: string) => this.showLoginForm = value != null && value === 'true');
    this._loggedIn = localStorage.getItem('id_token') != null;
    this.menuVisible = false;
    this.menuStyle = 'width: 0%; float: left; margin-left: 0px';
    this.mainContentStyle = 'width: 100%; float: left margin-left: 0px';
    let sMessage: Observable<string> = this.route.queryParams.map(params => params['snackBarMessage'] || '');
    sMessage.subscribe((value) => this.snackMessage = value != null ? value : '');
    let showSnackBar: Observable<string> = this.route.queryParams.map(params => params['showSnackBar'] || 'false');
    showSnackBar.subscribe((value) => {
      if (value) {
        this.snack.showSnackMessage();
      }
    });
  }

  public onMenuShowHideClick() {
    this.menuVisible = !this.menuVisible;
    this.getMainStyle();
  }

  public onLoginClick() {
    this.showLoginForm = !this.showLoginForm;
  }

  public getMainStyle() {
    let divMenu = document.getElementById('divMenu');
    let divMainPage = document.getElementById('divMainPage');
    if (this.menuVisible) {
      divMenu.style.width = '15%';
      divMainPage.style.marginLeft = '15%';
    } else {
      divMenu.style.width = '0';
      divMainPage.style.marginLeft = '0';
    }
  }

  public performLogout() {
    let token = localStorage.getItem('id_token');
    if (token != null && token.length > 0) {
      localStorage.removeItem('id_token');
      this._loggedIn = false;
    }
  }

  public onLoginChange(value: boolean) {
    console.log('parent' + value);
    this.snackMessage = 'Login successful';
    this.snack.showSnackMessage();
    this._loggedIn = localStorage.getItem('id_token') != null;
  }

  public onLoginError(value: string) {
    if (value != null && value.indexOf('Unauthorized') > 0) {
      this.snackMessage = 'Login failed';
      this.snack.showSnackMessage();
    }
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
