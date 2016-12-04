import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {MusicService} from "../../service/music-service/music.service";
import {VideoService} from "../../service/video-service/video.service";
import {ImageService} from "../../service/image-service/image.service";
import {EbookService} from "../../service/ebook-service/ebook.service";
import {SongDTO} from "../../model/music/song.dto";
import {VideoDTO} from "../../model/video/video.dto";
import {ImageDTO} from "../../model/image/image.dto";
import {EbookDTO} from "../../model/ebook/ebook.dto";
import {MediaItem} from "../../model/abstract/media.item";
import {ModalDirective} from 'ng2-bootstrap';
import {UploadSongMetadataDTO} from "../../model/music/upload.song.metadata.dto";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {FileMetadata} from "../../model/abstract/file.metadata";
import {MetadataInfoViewComponent} from "../metadata-info-view/metadata-info-view.component";

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

  public selectedItem: FileMetadata;

  constructor(private musicService: MusicService,
              private videoService: VideoService,
              private imageService: ImageService,
              private ebookService: EbookService) {
    super();
    this.top10Songs = [];
    this.top10Videos = [];
    this.top10Images = [];
    this.top10Ebooks = [];
  }

  public ngOnInit() {
    this.musicService.getTop10Songs(null).subscribe(value => {
      this.top10Songs = value;
    });
    this.videoService.getTop10Videos(null).subscribe(value => {
      this.top10Videos = value;
    });
    this.imageService.getTop10Images(null).subscribe(value => {
      this.top10Images = value;
    });
    this.ebookService.getTop10Ebooks(null).subscribe(value => {
      this.top10Ebooks = value;
    });
  }

  public onPlayClick(selectedItem: MediaItem, category: string): void {

  }

  public onInfoItemClick(selectedItem: MediaItem, category: string): void {
    this.category = category;
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
