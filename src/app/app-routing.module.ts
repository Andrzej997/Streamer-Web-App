import {NgModule}             from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterFormComponent} from './main_page/register-form/register-form.component';
import {AboutViewComponent} from './main_page/about-view/about-view.component';
import {AccountViewComponent} from './main_page/account-view/account-view.component';
import {ContactViewComponent} from './main_page/contact-view/contact-view.component';
import {HelpViewComponent} from './main_page/help-view/help-view.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'register', component: RegisterFormComponent},
      {path: 'about', component: AboutViewComponent},
      {path: 'account', component: AccountViewComponent},
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
