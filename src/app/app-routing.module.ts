import {NgModule}             from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterFormComponent} from './main_page/register-form/register-form.component';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: AppComponent},
      {path: 'register', component: RegisterFormComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
