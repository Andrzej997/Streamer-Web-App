import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterFormComponent} from './main_page/register-form/register-form.component';
import {AboutViewComponent} from './main_page/about-view/about-view.component';
import {AccountViewComponent} from './main_page/account-view/account-view.component';
import {ContactViewComponent} from './main_page/contact-view/contact-view.component';
import {HelpViewComponent} from './main_page/help-view/help-view.component';
import {AuthGuard} from './common/auth.guard';
import {ChangePasswordFormComponent} from './main_page/change-password-form/change-password-form.component';
import {UploadFormComponent} from './main_page/upload-form/upload-form.component';
import {TopListViewComponent} from './main_page/top-list-view/top-list-view.component';
import {UserMediaViewComponent} from './main_page/user-media-view/user-media-view.component';
import {MusicViewComponent} from './left-menu/music-view/music-view.component';
import {VideoViewComponent} from './left-menu/video-view/video-view.component';
import {ImageViewComponent} from './left-menu/image-view/image-view.component';
import {EbookViewComponent} from './left-menu/ebook-view/ebook-view.component';
import {ManageUsersViewComponent} from './admin-panel/manage-users-view/manage-users-view.component';
import {AdminGuard} from './common/admin.guard';
import {ManageContentViewComponent} from './admin-panel/manage-content-view/manage-content-view.component';
import {RadioViewComponent} from './main_page/radio-view/radio-view.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: '/top', pathMatch: 'full'},
      {path: 'register', component: RegisterFormComponent},
      {path: 'about', component: AboutViewComponent},
      {path: 'account', component: AccountViewComponent, canActivate: [AuthGuard]},
      {path: 'password', component: ChangePasswordFormComponent, canActivate: [AuthGuard]},
      {path: 'contact', component: ContactViewComponent},
      {path: 'help', component: HelpViewComponent},
      {path: 'upload', component: UploadFormComponent, canActivate: [AuthGuard]},
      {path: 'top', component: TopListViewComponent},
      {path: 'myfiles', component: UserMediaViewComponent, canActivate: [AuthGuard]},
      {path: 'music', component: MusicViewComponent},
      {path: 'video', component: VideoViewComponent},
      {path: 'image', component: ImageViewComponent},
      {path: 'ebook', component: EbookViewComponent},
      {
        path: 'admin', canActivate: [AdminGuard], canActivateChild: [AdminGuard], children: [
        {path: 'manage-users', component: ManageUsersViewComponent},
        {path: 'manage-content', component: ManageContentViewComponent}
      ]
      },
      {path: 'radio', component: RadioViewComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
