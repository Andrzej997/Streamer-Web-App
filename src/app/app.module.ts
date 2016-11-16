import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {DropdownModule} from 'ng2-bootstrap/ng2-bootstrap';

import {AppComponent} from './app.component';
import {AuthService} from './service/auth-service/auth.service';

import {AppRoutingModule} from './app-routing.module';
import {LoginFormComponent} from './main_page/login-form/login-form.component';
import {RegisterFormComponent} from './main_page/register-form/register-form.component';
import {ContactViewComponent} from './main_page/contact-view/contact-view.component';
import {AccountViewComponent} from './main_page/account-view/account-view.component';
import {SearchComponentComponent} from './main_page/search-component/search-component.component';
import {AboutViewComponent} from './main_page/about-view/about-view.component';
import {HelpViewComponent} from './main_page/help-view/help-view.component';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {MainComponent} from './main_page/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ContactViewComponent,
    AccountViewComponent,
    SearchComponentComponent,
    AboutViewComponent,
    HelpViewComponent,
    SnackBarComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  providers: [AuthService, {provide: 'Window', useValue: window}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
