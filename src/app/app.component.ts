import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Router, ActivatedRoute, NavigationExtras, Params} from '@angular/router';
import {title} from './constants';
import {BaseComponent} from './base-component/base-component';
import {Observable} from 'rxjs/Observable';
import {SearchCriteria} from './view-objects/search.criteria';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {AuthService} from './service/auth-service/auth.service';
import {tokenNotExpired} from 'angular2-jwt';
import {environment} from '../environments/environment';
import {BsDropdownContainerComponent, BsDropdownDirective} from 'ngx-bootstrap';
import {ConnectionWorkerFactory} from './workers/connection-worker-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = `${title}`;
  showLoginForm: boolean = false;
  private _loggedIn: boolean = false;
  private _isAdmin: boolean = false;
  menuVisible: boolean;
  mainContentStyle: string;
  menuStyle: string;

  musicEnabled = environment.musicEnabled;
  ebookEnabled = environment.ebookEnabled;
  imageEnabled = environment.imageEnabled;
  videoEnabled = environment.videoEnabled;

  @ViewChild('snackMain')
  private snack: SnackBarComponent;

  @ViewChildren(BsDropdownDirective)
  private wth;

  private showSnack: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
    super();
  }

  public ngOnInit() {
    let showLogin: Observable<string> = this.route.queryParams.map((params: Params) => params['showLoginForm'] || 'false');
    showLogin.subscribe((value: string) => this.showLoginForm = value != null && value === 'true');
    this._loggedIn = localStorage.getItem(environment.tokenName) != null && tokenNotExpired(environment.tokenName);
    this.menuVisible = false;
    this.menuStyle = 'width: 0%; float: left; margin-left: 0px';
    this.mainContentStyle = 'width: 100%; float: left margin-left: 0px';
    let sMessage: Observable<string> = this.route.queryParams.map(params => params['snackBarMessage'] || '');
    sMessage.subscribe((value) => this.snack._message = value != null ? value : '');
    let showSnackBar: Observable<string> = this.route.queryParams.map(params => params['showSnackBar'] || 'false');
    showSnackBar.subscribe((value) => {
      if (value != null && value === 'true') {
        this.snack._visible = true;
        this.snack._timeout = 3000;
        this.snack.showSnackMessage();
      }
    });
    this.authService.isAdmin().subscribe((value: boolean) => {
      this._isAdmin = value;
    });
    this.gatherNetworkStatistics();
  }

  public gatherNetworkStatistics(): void {
    setTimeout(() => {
      let factory: ConnectionWorkerFactory = new ConnectionWorkerFactory();
      factory.doWork();
    }, 1000);
  }

  public ngAfterViewChecked(): void {
    if (this.showSnack) {
      this.snack.showSnackMessage();
      this.showSnack = false;
    }
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
    let token = localStorage.getItem(environment.tokenName);
    if (token != null && token.length > 0) {
      localStorage.removeItem(environment.tokenName);
      localStorage.removeItem('username');
      this._loggedIn = false;
      this._isAdmin = false;
      this.snack._timeout = 3000;
      this.snack._message = 'Logged out';
      this.snack.showSnackMessage();
    }
  }

  public onLoginChange(value: boolean) {
    console.log('parent' + value);
    this.snack._message = 'Login successful';
    this.snack._timeout = 3000;
    this.snack.showSnackMessage();
    this._loggedIn = localStorage.getItem(environment.tokenName) != null;
    this.authService.isAdmin().subscribe((value: boolean) => {
      this._isAdmin = value;
    });
  }

  public onLoginError(value: string) {
    if (value != null && value.indexOf('Unauthorized') > 0) {
      this.snack._message = 'Login failed';
      this.snack._timeout = 3000;
      this.snack.showSnackMessageError();
    }
  }

  public onSearchData(value: SearchCriteria): void {
    if (value == null) {
      return;
    }
    let params: NavigationExtras = {
      queryParams: {'criteria': JSON.stringify(value)}
    };
    switch (value.endpoint) {
      case 'M':
        this.router.navigate(['/music'], params);
        break;
      case 'V':
        this.router.navigate(['/video'], params);
        break;
      case 'I':
        this.router.navigate(['/image'], params);
        break;
      case 'E':
        this.router.navigate(['/ebook'], params);
        break;
    }
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
