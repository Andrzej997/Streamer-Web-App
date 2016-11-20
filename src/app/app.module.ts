import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {DropdownModule} from 'ng2-bootstrap/ng2-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';

import {AuthHttp} from 'angular2-jwt';
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
import {AuthGuard} from "./common/auth.guard";
import {AuthProvider} from "./common/auth.provider";
import {ChangePasswordFormComponent} from './main_page/change-password-form/change-password-form.component';
import {UploadFormComponent} from './main_page/upload-form/upload-form.component';
import {MediaFileUploader} from "./common/media.file.uploader";

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
    MainComponent,
    ChangePasswordFormComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    FileUploadModule
  ],
  providers: [
    AuthService,
    {provide: 'Window', useValue: window},
    AuthGuard,
    {provide: AuthHttp, useClass: AuthProvider},
    MediaFileUploader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
