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
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
