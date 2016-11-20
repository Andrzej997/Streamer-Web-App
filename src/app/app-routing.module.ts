import {NgModule}             from '@angular/core';
import {RouterModule, RouterOutletMap} from '@angular/router';
import {RegisterFormComponent} from './main_page/register-form/register-form.component';
import {AboutViewComponent} from './main_page/about-view/about-view.component';
import {AccountViewComponent} from './main_page/account-view/account-view.component';
import {ContactViewComponent} from './main_page/contact-view/contact-view.component';
import {HelpViewComponent} from './main_page/help-view/help-view.component';
import {AppComponent} from "./app.component";
import {MainComponent} from "./main_page/main/main.component";
import {AuthGuard} from "./common/auth.guard";
import {ChangePasswordFormComponent} from "./main_page/change-password-form/change-password-form.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'main', component: MainComponent},
      {path: 'register', component: RegisterFormComponent},
      {path: 'about', component: AboutViewComponent},
      {path: 'account', component: AccountViewComponent, canActivate: [AuthGuard]},
      {path: 'password', component: ChangePasswordFormComponent, canActivate: [AuthGuard]},
      {path: 'contact', component: ContactViewComponent},
      {path: 'help', component: HelpViewComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
