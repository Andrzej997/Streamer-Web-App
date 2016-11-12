import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {title} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = `${title}`;
  showLoginForm: boolean;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.showLoginForm = false;
  }

  onLoginClick() {
    this.showLoginForm = !this.showLoginForm;
  }

}
