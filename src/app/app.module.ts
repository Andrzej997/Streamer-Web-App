import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {BsDropdownModule, ModalModule, TypeaheadModule, RatingModule, ProgressbarModule} from 'ngx-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import {AuthHttp, AuthConfig } from 'angular2-jwt';
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
import {AuthGuard} from './common/auth.guard';
import {ChangePasswordFormComponent} from './main_page/change-password-form/change-password-form.component';
import {UploadFormComponent} from './main_page/upload-form/upload-form.component';
import {MediaFileUploader} from './common/media.file.uploader';
import {MusicService} from './service/music-service/music.service';
import {VideoService} from './service/video-service/video.service';
import {ImageService} from './service/image-service/image.service';
import {EbookService} from './service/ebook-service/ebook.service';
import {EditEbookMetadataComponent} from './main_page/edit-ebook-metadata/edit-ebook-metadata.component';
import {EditImageMetadataComponent} from './main_page/edit-image-metadata/edit-image-metadata.component';
import {EditMusicMetadataComponent} from './main_page/edit-music-metadata/edit-music-metadata.component';
import {EditVideoMetadataComponent} from './main_page/edit-video-metadata/edit-video-metadata.component';
import {TopListViewComponent} from './main_page/top-list-view/top-list-view.component';
import {UserMediaViewComponent} from './main_page/user-media-view/user-media-view.component';
import {MetadataInfoViewComponent} from './main_page/metadata-info-view/metadata-info-view.component';
import {EbookViewComponent} from './left-menu/ebook-view/ebook-view.component';
import {ImageViewComponent} from './left-menu/image-view/image-view.component';
import {MusicViewComponent} from './left-menu/music-view/music-view.component';
import {VideoViewComponent} from './left-menu/video-view/video-view.component';
import {AudioPlayerComponent} from './player/audio-player/audio-player.component';
import {VideoPlayerComponent} from './player/video-player/video-player.component';
import {ImageModalComponent} from './components/image-modal/image-modal.component';
import {EbookModalComponent} from './components/ebook-modal/ebook-modal.component';
import {ManageUsersViewComponent} from './admin-panel/manage-users-view/manage-users-view.component';
import {ManageContentViewComponent} from './admin-panel/manage-content-view/manage-content-view.component';
import {AssuranceModalComponent} from './components/assurance-modal/assurance-modal.component';
import {AdminGuard} from './common/admin.guard';
import {RadioViewComponent} from './main_page/radio-view/radio-view.component';
import {RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {environment} from '../environments/environment';
import { PasswordInputDirective } from './common/password-input.directive';
import { EmailValidatorDirective } from './common/email-validator.directive';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'AuthHeader',
    headerPrefix: '',
    tokenName: environment.tokenName,
    tokenGetter: (() => localStorage.getItem(environment.tokenName)),
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: true,
    noTokenScheme: true
  }), http, options);
}

//noinspection TsLint
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
    ChangePasswordFormComponent,
    UploadFormComponent,
    EditEbookMetadataComponent,
    EditImageMetadataComponent,
    EditMusicMetadataComponent,
    EditVideoMetadataComponent,
    TopListViewComponent,
    UserMediaViewComponent,
    MetadataInfoViewComponent,
    EbookViewComponent,
    ImageViewComponent,
    MusicViewComponent,
    VideoViewComponent,
    AudioPlayerComponent,
    VideoPlayerComponent,
    ImageModalComponent,
    EbookModalComponent,
    ManageUsersViewComponent,
    ManageContentViewComponent,
    AssuranceModalComponent,
    RadioViewComponent,
    PasswordInputDirective,
    EmailValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    FileUploadModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    RatingModule.forRoot(),
    ProgressbarModule.forRoot(),
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    MediaFileUploader,
    MusicService,
    VideoService,
    ImageService,
    EbookService,
    {provide: RECAPTCHA_SETTINGS, useValue: { siteKey: environment.siteCaptchaKey } as RecaptchaSettings},
    {provide: RECAPTCHA_LANGUAGE, useValue: 'en'},
    {provide: 'Window', useValue: window}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
