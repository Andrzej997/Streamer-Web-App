import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {SongDTO} from "../../model/music/song.dto";
import {VideoDTO} from "../../model/video/video.dto";
import {ImageDTO} from "../../model/image/image.dto";
import {EbookDTO} from "../../model/ebook/ebook.dto";
import {MusicService} from "../../service/music-service/music.service";
import {VideoService} from "../../service/video-service/video.service";
import {ImageService} from "../../service/image-service/image.service";
import {EbookService} from "../../service/ebook-service/ebook.service";
import {MediaItem} from "../../model/abstract/media.item";
import {ModalDirective} from 'ng2-bootstrap';
import {EditMusicMetadataComponent} from "../edit-music-metadata/edit-music-metadata.component";
import {EditVideoMetadataComponent} from "../edit-video-metadata/edit-video-metadata.component";
import {EditImageMetadataComponent} from "../edit-image-metadata/edit-image-metadata.component";
import {EditEbookMetadataComponent} from "../edit-ebook-metadata/edit-ebook-metadata.component";
import {UploadSongMetadataDTO} from "../../model/music/upload.song.metadata.dto";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {FileMetadata} from "../../model/abstract/file.metadata";

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
  @ViewChild('deleteValidationModal') public deleteValidationModal: ModalDirective;

  @ViewChild(EditMusicMetadataComponent)
  public editMusicMetadata: EditMusicMetadataComponent;

  @ViewChild(EditVideoMetadataComponent)
  public editVideoMetadata: EditVideoMetadataComponent;

  @ViewChild(EditImageMetadataComponent)
  public editImageMetadata: EditImageMetadataComponent;

  @ViewChild(EditEbookMetadataComponent)
  public editEbookMetadata: EditEbookMetadataComponent;

  private itemToDelete: MediaItem;
  private editedIndex: number;

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
    this.musicService.getAllUserSongs().subscribe(value => {
      this.userSongs = value;
    });
    this.videoService.getAllUserVideos().subscribe(value => {
      this.userVideos = value;
    });
    this.imageService.getAllUserImages().subscribe(value => {
      this.userImages = value;
    });
    this.ebookService.getAllUserEbooks().subscribe(value => {
      this.userEbooks = value;
    });
  }

  public onPlayClick(selectedItem: MediaItem, category: string): void {

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
    this.deleteValidationModal.show();
  }

  public onDeleteYes(): void {
    this.deleteValidationModal.hide();
    if (this.itemToDelete == null) {
      return;
    }
    let index: number = 0;
    switch (this.category) {
      case 'M':
        index = this.userSongs.indexOf(<SongDTO> this.itemToDelete);
        this.musicService.deleteFileAndMetadata((<SongDTO>this.itemToDelete)._fileId).subscribe((value: boolean) => {
          if (value)
            this.userSongs.splice(index, 1);
        });
        break;
      case 'V':
        index = this.userVideos.indexOf(<VideoDTO> this.itemToDelete);
        this.videoService.deleteFileAndMetadata((<VideoDTO>this.itemToDelete)._videoFileId).subscribe((value: boolean) => {
          if (value)
            this.userVideos.splice(index, 1);
        });
        break;
      case 'I':
        index = this.userImages.indexOf(<ImageDTO>this.itemToDelete);
        this.imageService.deleteFileAndMetadata((<ImageDTO>this.itemToDelete)._imageFileId).subscribe((value: boolean) => {
          if (value)
            this.userImages.splice(index, 1);
        });
        break;
      case 'E':
        index = this.userEbooks.indexOf(<EbookDTO>this.itemToDelete);
        this.ebookService.deleteFileAndMetadata((<EbookDTO>this.itemToDelete)._ebookFileId).subscribe((value: boolean) => {
          if (value)
            this.userEbooks.splice(index, 1);
        });
        break;
    }
  }

}
