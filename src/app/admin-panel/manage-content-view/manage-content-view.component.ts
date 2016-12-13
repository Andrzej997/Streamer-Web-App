import {Component, ViewChild} from "@angular/core";
import {BaseComponent} from "../../base-component/base-component";
import {SongDTO} from "../../model/music/song.dto";
import {ImageDTO} from "../../model/image/image.dto";
import {EbookDTO} from "../../model/ebook/ebook.dto";
import {VideoDTO} from "../../model/video/video.dto";
import {AssuranceModalComponent} from "../../components/assurance-modal/assurance-modal.component";
import {EditMusicMetadataComponent} from "../../main_page/edit-music-metadata/edit-music-metadata.component";
import {EditVideoMetadataComponent} from "../../main_page/edit-video-metadata/edit-video-metadata.component";
import {EditImageMetadataComponent} from "../../main_page/edit-image-metadata/edit-image-metadata.component";
import {AudioPlayerComponent} from "../../player/audio-player/audio-player.component";
import {VideoPlayerComponent} from "../../player/video-player/video-player.component";
import {EditEbookMetadataComponent} from "../../main_page/edit-ebook-metadata/edit-ebook-metadata.component";
import {ImageModalComponent} from "../../components/image-modal/image-modal.component";
import {EbookModalComponent} from "../../components/ebook-modal/ebook-modal.component";
import {MusicService} from "../../service/music-service/music.service";
import {VideoService} from "../../service/video-service/video.service";
import {ImageService} from "../../service/image-service/image.service";
import {EbookService} from "../../service/ebook-service/ebook.service";
import {MediaItem} from "../../model/abstract/media.item";
import {ModalDirective} from "ng2-bootstrap";
import {FileMetadata} from "../../model/abstract/file.metadata";
import {UploadSongMetadataDTO} from "../../model/music/upload.song.metadata.dto";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {UsersDTO} from "../../model/users.dto";
import {AuthService} from "../../service/auth-service/auth.service";

@Component({
  selector: 'app-manage-content-view',
  templateUrl: './manage-content-view.component.html',
  styleUrls: ['./manage-content-view.component.css']
})
export class ManageContentViewComponent extends BaseComponent {

  public songs: SongDTO[];
  public videos: VideoDTO[];
  public images: ImageDTO[];
  public ebooks: EbookDTO[];

  private users: UsersDTO[];

  public category: string;

  @ViewChild('metadataModal') public metadataModal: ModalDirective;

  @ViewChild('assuranceModalMedia')
  private assuranceModal: AssuranceModalComponent;

  @ViewChild(EditMusicMetadataComponent)
  public editMusicMetadata: EditMusicMetadataComponent;

  @ViewChild(EditVideoMetadataComponent)
  public editVideoMetadata: EditVideoMetadataComponent;

  @ViewChild(EditImageMetadataComponent)
  public editImageMetadata: EditImageMetadataComponent;

  @ViewChild(EditEbookMetadataComponent)
  public editEbookMetadata: EditEbookMetadataComponent;

  @ViewChild('audioUser')
  private audioPlayer: AudioPlayerComponent;

  @ViewChild('videoUser')
  private videoPlayer: VideoPlayerComponent;

  @ViewChild('imageUser')
  private imageModal: ImageModalComponent;

  @ViewChild('ebookUser')
  private ebookModal: EbookModalComponent;

  private itemToDelete: MediaItem;
  private searchedUser: string;

  constructor(private musicService: MusicService,
              private videoService: VideoService,
              private imageService: ImageService,
              private ebookService: EbookService,
              private authService: AuthService) {
    super();
    this.songs = [];
    this.videos = [];
    this.images = [];
    this.ebooks = [];
  }

  public ngOnInit() {
    this.musicService.getSongsAsAdmin().subscribe((value: SongDTO[]) => {
      value.forEach((item: SongDTO) => item._rate = item._rating / 10);
      this.songs = value;
    });
    this.videoService.getVideosAsAdmin().subscribe((value: VideoDTO[]) => {
      value.forEach((item: VideoDTO) => item._rate = item._rating / 10);
      this.videos = value;
    });
    this.imageService.getImagesAsAdmin().subscribe((value: ImageDTO[])=> {
      value.forEach((item: ImageDTO) => item._rate = item._rating / 10);
      this.images = value;
    });
    this.ebookService.getEbooksAsAdmin().subscribe((value: EbookDTO[]) => {
      value.forEach((item: EbookDTO) => item._rate = item._rating / 10);
      this.ebooks = value;
    });
    this.authService.getAllUsers().subscribe((value: UsersDTO[]) => {
      this.users = value;
    })
  }

  public onPlayClick(selectedItem: MediaItem, category: string): void {
    switch (category) {
      case 'M':
        if (this.videoPlayer.visible) {
          this.videoPlayer.onExit();
        }
        this.audioPlayer.setAuthContext(true);
        this.audioPlayer.show((<SongDTO>selectedItem));
        break;
      case 'V':
        if (this.audioPlayer.visible) {
          this.audioPlayer.onExit();
        }
        this.videoPlayer.setAuthContext(true);
        this.videoPlayer.show((<VideoDTO>selectedItem));
        break;
      case 'I':
        this.imageModal.setAuthContext(true);
        this.imageModal.show((<ImageDTO>selectedItem));
        break;
      case 'E':
        this.ebookModal.setAuthContext(false);
        this.ebookModal.show((<EbookDTO>selectedItem));
        break;
    }
  }

  public onEditClick(selectedItem: MediaItem, category: string): void {
    this.category = category;
    let metadata: FileMetadata;
    switch (category) {
      case 'M':
        metadata = new UploadSongMetadataDTO();
        (<UploadSongMetadataDTO>metadata)._song = <SongDTO>selectedItem;
        this.editMusicMetadata.setMetadata(<UploadSongMetadataDTO>metadata);
        break;
      case 'V':
        metadata = new UploadVideoMetadataDTO();
        (<UploadVideoMetadataDTO>metadata)._video = <VideoDTO>selectedItem;
        this.editVideoMetadata.setMetadata(<UploadVideoMetadataDTO>metadata);
        break;
      case 'I':
        metadata = new UploadImageMetadataDTO();
        (<UploadImageMetadataDTO>metadata)._imageDTO = <ImageDTO>selectedItem;
        this.editImageMetadata.setMetadata(<UploadImageMetadataDTO>metadata);
        break;
      case 'E':
        metadata = new UploadEbookMetadataDTO();
        (<UploadEbookMetadataDTO>metadata)._ebookDTO = <EbookDTO>selectedItem;
        this.editEbookMetadata.setMetadata(<UploadEbookMetadataDTO>metadata);
        break;
    }
    this.metadataModal.show();
  }

  public onEditHide(value: boolean): void {
    let index = 0;
    let metadata: MediaItem = null;
    this.metadataModal.hide();
    switch (this.category) {
      case 'M':
        metadata = this.editMusicMetadata.getMetadata();
        index = this.songs.indexOf(<SongDTO>metadata);
        this.musicService.updateSongMetadata(<SongDTO>metadata).subscribe((value: SongDTO) => {
          this.songs[index] = value;
        });
        break;
      case 'V':
        metadata = this.editVideoMetadata.getMetadata();
        index = this.videos.indexOf(<VideoDTO>metadata);
        this.videoService.updateVideoMetadata(<VideoDTO>metadata).subscribe((value: VideoDTO) => {
          this.videos[index] = value;
        });
        break;
      case 'I':
        metadata = this.editImageMetadata.getMetadata();
        index = this.images.indexOf(<ImageDTO>metadata);
        this.imageService.updateImageMetadata(<ImageDTO>metadata).subscribe((value: ImageDTO) => {
          this.images[index] = value;
        });
        break;
      case 'E':
        metadata = this.editEbookMetadata.getMetadata();
        index = this.ebooks.indexOf(<EbookDTO>metadata);
        this.ebookService.updateEbookMetadata(<EbookDTO>metadata).subscribe((value: EbookDTO) => {
          this.ebooks[index] = value;
        });
        break;
    }
  }

  public onHideClick() {
    this.metadataModal.hide();
  }

  public onRemoveClick(selectedItem: MediaItem, category: string): void {
    this.category = category;
    this.itemToDelete = selectedItem;
    this.assuranceModal.show();
  }

  public onMediaDeleteConfirm(value: boolean): void {
    if (this.itemToDelete == null || !value) {
      return;
    }
    let index: number = 0;
    let username: string = this.findUsernameConnected(this.itemToDelete);
    if (username == null || username.length <= 0) {
      return;
    }
    switch (this.category) {
      case 'M':
        index = this.songs.indexOf(<SongDTO> this.itemToDelete);
        this.musicService.deleteFileAndMetadataAsAdmin
        ((<SongDTO>this.itemToDelete)._fileId, username).subscribe((value: boolean) => {
          if (value)
            this.songs.splice(index, 1);
        });
        break;
      case 'V':
        index = this.videos.indexOf(<VideoDTO> this.itemToDelete);
        this.videoService.deleteFileAndMetadataAsAdmin
        ((<VideoDTO>this.itemToDelete)._videoFileId, username).subscribe((value: boolean) => {
          if (value)
            this.videos.splice(index, 1);
        });
        break;
      case 'I':
        index = this.images.indexOf(<ImageDTO>this.itemToDelete);
        this.imageService.deleteFileAndMetadataAsAdmin
        ((<ImageDTO>this.itemToDelete)._imageFileId, username).subscribe((value: boolean) => {
          if (value)
            this.images.splice(index, 1);
        });
        break;
      case 'E':
        index = this.ebooks.indexOf(<EbookDTO>this.itemToDelete);
        this.ebookService.deleteFileAndMetadataAsAdmin
        ((<EbookDTO>this.itemToDelete)._ebookFileId, username).subscribe((value: boolean) => {
          if (value)
            this.ebooks.splice(index, 1);
        });
        break;
    }
  }

  public onSearchClick(): void {
    this.musicService.getSongsAsAdmin(this.searchedUser).subscribe((value: SongDTO[]) => {
      value.forEach((item: SongDTO) => item._rate = item._rating / 10);
      this.songs = value;
    });
    this.videoService.getVideosAsAdmin(this.searchedUser).subscribe((value: VideoDTO[]) => {
      value.forEach((item: VideoDTO) => item._rate = item._rating / 10);
      this.videos = value;
    });
    this.imageService.getImagesAsAdmin(this.searchedUser).subscribe((value: ImageDTO[])=> {
      value.forEach((item: ImageDTO) => item._rate = item._rating / 10);
      this.images = value;
    });
    this.ebookService.getEbooksAsAdmin(this.searchedUser).subscribe((value: EbookDTO[]) => {
      value.forEach((item: EbookDTO) => item._rate = item._rating / 10);
      this.ebooks = value;
    });
  }

  private findUsernameConnected(item: MediaItem): string {
    let _ownerId: number = null;
    _ownerId = item['_ownerId'];
    if (_ownerId == null) {
      return null;
    }
    for (let user of this.users) {
      if (user._userId == _ownerId) {
        return user._userName;
      }
    }
    return null;
  }

}
