import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {title} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = `${title}`;
  showLoginForm: boolean;
  private _loggedIn: boolean;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.showLoginForm = false;
    this.loggedIn = false;
  }

  ngAfterViewInit() {

  }

  onLoginClick() {
    this.showLoginForm = !this.showLoginForm;
  }

  onLoginChange(value: boolean) {
    console.log(value);
    this.loggedIn = value;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
