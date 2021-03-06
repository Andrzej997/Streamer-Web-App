import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {MusicService} from '../../service/music-service/music.service';
import {VideoService} from '../../service/video-service/video.service';
import {ImageService} from '../../service/image-service/image.service';
import {EbookService} from '../../service/ebook-service/ebook.service';
import {SongDTO} from '../../model/music/song.dto';
import {VideoDTO} from '../../model/video/video.dto';
import {ImageDTO} from '../../model/image/image.dto';
import {EbookDTO} from '../../model/ebook/ebook.dto';
import {MediaItem} from '../../model/abstract/media.item';
import {ModalDirective} from 'ngx-bootstrap';
import {UploadSongMetadataDTO} from '../../model/music/upload.song.metadata.dto';
import {UploadImageMetadataDTO} from '../../model/image/upload.image.metadata.dto';
import {UploadVideoMetadataDTO} from '../../model/video/upload.video.metadata.dto';
import {UploadEbookMetadataDTO} from '../../model/ebook/upload.ebook.metadata.dto';
import {FileMetadata} from '../../model/abstract/file.metadata';
import {MetadataInfoViewComponent} from '../metadata-info-view/metadata-info-view.component';
import {SnackBarComponent} from '../../components/snack-bar/snack-bar.component';
import {Observable} from 'rxjs';
import {AudioPlayerComponent} from '../../player/audio-player/audio-player.component';
import {VideoPlayerComponent} from '../../player/video-player/video-player.component';
import {ImageModalComponent} from '../../components/image-modal/image-modal.component';
import {EbookModalComponent} from '../../components/ebook-modal/ebook-modal.component';
import {environment} from '../../../environments/environment';
import {videoThumbnailEndpoint} from '../../constants';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-top-list-view',
  templateUrl: './top-list-view.component.html',
  styleUrls: ['./top-list-view.component.css']
})
export class TopListViewComponent extends BaseComponent {

  public top10Songs: SongDTO[];
  public top10Videos: VideoDTO[];
  public top10Images: ImageDTO[];
  public top10Ebooks: EbookDTO[];

  public category: string;

  @ViewChild('metadataModal') public metadataModal: ModalDirective;

  @ViewChild(MetadataInfoViewComponent)
  private metadataInfoView: MetadataInfoViewComponent;

  @ViewChild('snackTop')
  private snackbar: SnackBarComponent;

  @ViewChild('audioTop')
  private audioPlayer: AudioPlayerComponent;

  @ViewChild('videoTop')
  private videoPlayer: VideoPlayerComponent;

  @ViewChild('imageTop')
  private imageModal: ImageModalComponent;

  @ViewChild('ebookTop')
  private ebookModal: EbookModalComponent;

  public message: string;

  public selectedItem: FileMetadata;

  private showSnack: boolean = false;

  musicEnabled = environment.musicEnabled;
  ebookEnabled = environment.ebookEnabled;
  imageEnabled = environment.imageEnabled;
  videoEnabled = environment.videoEnabled;

  constructor(private musicService: MusicService,
              private videoService: VideoService,
              private imageService: ImageService,
              private ebookService: EbookService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    super();
    this.top10Songs = [];
    this.top10Videos = [];
    this.top10Images = [];
    this.top10Ebooks = [];
  }

  public ngOnInit() {
    if (this.musicEnabled) {
      this.musicService.getTop10Songs(null).subscribe((value: SongDTO[]) => {
        value.forEach((item: SongDTO) => item._rate = item._rating / 10);
        this.top10Songs = value;
      });
    }
    if (this.videoEnabled) {
      this.videoService.getTop10Videos(null).subscribe((value: VideoDTO[]) => {
        value.forEach((item: VideoDTO) => {
          item._rate = item._rating / 10;
          item._thumbnailSrc = this.sanitizer.bypassSecurityTrustStyle(
            'url(' + videoThumbnailEndpoint + '?id=' + item._videoFileId + ')') ;
        });
        this.top10Videos = value;
      });
    }
    if (this.imageEnabled) {
      this.imageService.getTop10Images(null).subscribe((value: ImageDTO[]) => {
        value.forEach((item: ImageDTO) => item._rate = item._rating / 10);
        this.top10Images = value;
      });
    }
    if (this.ebookEnabled) {
      this.ebookService.getTop10Ebooks(null).subscribe((value: EbookDTO[]) => {
        value.forEach((item: EbookDTO) => item._rate = item._rating / 10);
        this.top10Ebooks = value;
      });
    }
    let sMessage: Observable<string> = this.route.queryParams.map(params => params['snackBarMessageTop'] || '');
    sMessage.subscribe((value) => this.message = value != null ? value : '');
    let showSnackBar: Observable<string> = this.route.queryParams.map(params => params['showSnackBarTop'] || 'false');
    showSnackBar.subscribe((value) => {
      if (value != null && value === 'true') {
        this.snackbar._message = this.message;
        this.snackbar._timeout = 3000;
        this.snackbar._visible = true;
        this.showSnack = true;
      }
    });
  }

  public ngAfterViewChecked(): void {
    if (this.showSnack) {
      this.snackbar.showSnackMessage();
      this.showSnack = false;
    }
  }

  public onPlayClick(selectedItem: MediaItem, category: string): void {
    switch (category) {
      case 'M':
        if (this.videoPlayer.visible) {
          this.videoPlayer.onExit();
        }
        this.audioPlayer.show((<SongDTO>selectedItem));
        break;
      case 'V':
        if (this.audioPlayer.visible) {
          this.audioPlayer.onExit();
        }
        this.videoPlayer.show((<VideoDTO>selectedItem));
        break;
      case 'I':
        this.imageModal.show((<ImageDTO>selectedItem));
        break;
      case 'E':
        this.ebookModal.show((<EbookDTO>selectedItem));
        break;
    }
  }

  public onInfoItemClick(selectedItem: MediaItem, category: string): void {
    this.category = category;
    this.metadataInfoView.setCategory(this.category);
    this.createMetadataFileItem(selectedItem, category);
    this.showMetadataModal();
  }

  public hideMetadataModal(): void {
    this.metadataModal.hide();
  }

  public showMetadataModal(): void {
    this.metadataModal.show();
  }

  public createMetadataFileItem(selectedItem: MediaItem, category: string): void {
    switch (category) {
      case 'M':
        this.selectedItem = new UploadSongMetadataDTO();
        (<UploadSongMetadataDTO>this.selectedItem)._song = <SongDTO>selectedItem;
        break;
      case 'V':
        this.selectedItem = new UploadVideoMetadataDTO();
        (<UploadVideoMetadataDTO>this.selectedItem)._video = <VideoDTO>selectedItem;
        break;
      case 'I':
        this.selectedItem = new UploadImageMetadataDTO();
        (<UploadImageMetadataDTO>this.selectedItem)._imageDTO = <ImageDTO>selectedItem;
        break;
      case 'E':
        this.selectedItem = new UploadEbookMetadataDTO();
        (<UploadEbookMetadataDTO>this.selectedItem)._ebookDTO = <EbookDTO>selectedItem;
        break;
      default:
        break;
    }
    this.metadataInfoView.metadata = this.selectedItem;
    this.metadataInfoView.setCurrentItem();
  }

}
