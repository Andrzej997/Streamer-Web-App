import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {SongDTO} from '../../model/music/song.dto';
import {VideoDTO} from '../../model/video/video.dto';
import {ImageDTO} from '../../model/image/image.dto';
import {EbookDTO} from '../../model/ebook/ebook.dto';
import {MusicService} from '../../service/music-service/music.service';
import {VideoService} from '../../service/video-service/video.service';
import {ImageService} from '../../service/image-service/image.service';
import {EbookService} from '../../service/ebook-service/ebook.service';
import {MediaItem} from '../../model/abstract/media.item';
import {ModalDirective} from 'ngx-bootstrap';
import {EditMusicMetadataComponent} from '../edit-music-metadata/edit-music-metadata.component';
import {EditVideoMetadataComponent} from '../edit-video-metadata/edit-video-metadata.component';
import {EditImageMetadataComponent} from '../edit-image-metadata/edit-image-metadata.component';
import {EditEbookMetadataComponent} from '../edit-ebook-metadata/edit-ebook-metadata.component';
import {UploadSongMetadataDTO} from '../../model/music/upload.song.metadata.dto';
import {UploadVideoMetadataDTO} from '../../model/video/upload.video.metadata.dto';
import {UploadImageMetadataDTO} from '../../model/image/upload.image.metadata.dto';
import {UploadEbookMetadataDTO} from '../../model/ebook/upload.ebook.metadata.dto';
import {FileMetadata} from '../../model/abstract/file.metadata';
import {AudioPlayerComponent} from '../../player/audio-player/audio-player.component';
import {VideoPlayerComponent} from '../../player/video-player/video-player.component';
import {ImageModalComponent} from '../../components/image-modal/image-modal.component';
import {EbookModalComponent} from '../../components/ebook-modal/ebook-modal.component';
import {AssuranceModalComponent} from '../../components/assurance-modal/assurance-modal.component';

@Component({
  selector: 'app-user-media-view',
  templateUrl: './user-media-view.component.html',
  styleUrls: ['./user-media-view.component.css']
})
export class UserMediaViewComponent extends BaseComponent {

  public userSongs: SongDTO[];
  public userVideos: VideoDTO[];
  public userImages: ImageDTO[];
  public userEbooks: EbookDTO[];

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

  constructor(private musicService: MusicService,
              private videoService: VideoService,
              private imageService: ImageService,
              private ebookService: EbookService) {
    super();
    this.userSongs = [];
    this.userVideos = [];
    this.userImages = [];
    this.userEbooks = [];
  }

  public ngOnInit() {
    this.musicService.getAllUserSongs().subscribe((value: SongDTO[]) => {
      value.forEach((item: SongDTO) => item._rate = item._rating / 10);
      this.userSongs = value;
    });
    this.videoService.getVideosAsAdmin().subscribe((value: VideoDTO[]) => {
      value.forEach((item: VideoDTO) => item._rate = item._rating / 10);
      this.userVideos = value;
    });
    this.imageService.getImagesAsAdmin().subscribe((value: ImageDTO[]) => {
      value.forEach((item: ImageDTO) => item._rate = item._rating / 10);
      this.userImages = value;
    });
    this.ebookService.getEbooksAsAdmin().subscribe((value: EbookDTO[]) => {
      value.forEach((item: EbookDTO) => item._rate = item._rating / 10);
      this.userEbooks = value;
    });
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
        index = this.userSongs.indexOf(<SongDTO>metadata);
        this.musicService.updateSongMetadata(<SongDTO>metadata).subscribe((value: SongDTO) => {
          this.userSongs[index] = value;
        });
        break;
      case 'V':
        metadata = this.editVideoMetadata.getMetadata();
        index = this.userVideos.indexOf(<VideoDTO>metadata);
        this.videoService.updateVideoMetadata(<VideoDTO>metadata).subscribe((value: VideoDTO) => {
          this.userVideos[index] = value;
        });
        break;
      case 'I':
        metadata = this.editImageMetadata.getMetadata();
        index = this.userImages.indexOf(<ImageDTO>metadata);
        this.imageService.updateImageMetadata(<ImageDTO>metadata).subscribe((value: ImageDTO) => {
          this.userImages[index] = value;
        });
        break;
      case 'E':
        metadata = this.editEbookMetadata.getMetadata();
        index = this.userEbooks.indexOf(<EbookDTO>metadata);
        this.ebookService.updateEbookMetadata(<EbookDTO>metadata).subscribe((value: EbookDTO) => {
          this.userEbooks[index] = value;
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
    switch (this.category) {
      case 'M':
        index = this.userSongs.indexOf(<SongDTO> this.itemToDelete);
        this.musicService.deleteFileAndMetadata((<SongDTO>this.itemToDelete)._fileId).subscribe((value: boolean) => {
          if (value) {
            this.userSongs.splice(index, 1);
          }
        });
        break;
      case 'V':
        index = this.userVideos.indexOf(<VideoDTO> this.itemToDelete);
        this.videoService.deleteFileAndMetadata((<VideoDTO>this.itemToDelete)._videoFileId).subscribe((value: boolean) => {
          if (value) {
            this.userVideos.splice(index, 1);
          }
        });
        break;
      case 'I':
        index = this.userImages.indexOf(<ImageDTO>this.itemToDelete);
        this.imageService.deleteFileAndMetadata((<ImageDTO>this.itemToDelete)._imageFileId).subscribe((value: boolean) => {
          if (value) {
            this.userImages.splice(index, 1);
          }
        });
        break;
      case 'E':
        index = this.userEbooks.indexOf(<EbookDTO>this.itemToDelete);
        this.ebookService.deleteFileAndMetadata((<EbookDTO>this.itemToDelete)._ebookFileId).subscribe((value: boolean) => {
          if (value) {
            this.userEbooks.splice(index, 1);
          }
        });
        break;
    }
  }

}
