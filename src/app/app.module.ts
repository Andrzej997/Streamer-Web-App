import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {DropdownModule, ModalModule, TypeaheadModule, RatingModule} from "ng2-bootstrap/ng2-bootstrap";
import {FileUploadModule} from "ng2-file-upload";
import {AuthHttp} from "angular2-jwt";
import {AppComponent} from "./app.component";
import {AuthService} from "./service/auth-service/auth.service";
import {AppRoutingModule} from "./app-routing.module";
import {LoginFormComponent} from "./main_page/login-form/login-form.component";
import {RegisterFormComponent} from "./main_page/register-form/register-form.component";
import {ContactViewComponent} from "./main_page/contact-view/contact-view.component";
import {AccountViewComponent} from "./main_page/account-view/account-view.component";
import {SearchComponentComponent} from "./main_page/search-component/search-component.component";
import {AboutViewComponent} from "./main_page/about-view/about-view.component";
import {HelpViewComponent} from "./main_page/help-view/help-view.component";
import {SnackBarComponent} from "./components/snack-bar/snack-bar.component";
import {AuthGuard} from "./common/auth.guard";
import {AuthProvider} from "./common/auth.provider";
import {ChangePasswordFormComponent} from "./main_page/change-password-form/change-password-form.component";
import {UploadFormComponent} from "./main_page/upload-form/upload-form.component";
import {MediaFileUploader} from "./common/media.file.uploader";
import {MusicService} from "./service/music-service/music.service";
import {VideoService} from "./service/video-service/video.service";
import {ImageService} from "./service/image-service/image.service";
import {EbookService} from "./service/ebook-service/ebook.service";
import {EditEbookMetadataComponent} from "./main_page/edit-ebook-metadata/edit-ebook-metadata.component";
import {EditImageMetadataComponent} from "./main_page/edit-image-metadata/edit-image-metadata.component";
import {EditMusicMetadataComponent} from "./main_page/edit-music-metadata/edit-music-metadata.component";
import {EditVideoMetadataComponent} from "./main_page/edit-video-metadata/edit-video-metadata.component";
import {TopListViewComponent} from "./main_page/top-list-view/top-list-view.component";
import {UserMediaViewComponent} from "./main_page/user-media-view/user-media-view.component";
import {MetadataInfoViewComponent} from "./main_page/metadata-info-view/metadata-info-view.component";
import {EbookViewComponent} from "./left-menu/ebook-view/ebook-view.component";
import {ImageViewComponent} from "./left-menu/image-view/image-view.component";
import {MusicViewComponent} from "./left-menu/music-view/music-view.component";
import {VideoViewComponent} from "./left-menu/video-view/video-view.component";
import {AudioPlayerComponent} from "./player/audio-player/audio-player.component";
import {VideoPlayerComponent} from "./player/video-player/video-player.component";
import {ImageModalComponent} from "./components/image-modal/image-modal.component";

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    FileUploadModule,
    ModalModule,
    TypeaheadModule,
    RatingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {provide: AuthHttp, useClass: AuthProvider},
    MediaFileUploader,
    MusicService,
    VideoService,
    ImageService,
    EbookService,
    {provide: 'Window', useValue: window}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
