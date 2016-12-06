import {Component, SimpleChanges, Input} from '@angular/core';
import {UploadSongMetadataDTO} from "../../model/music/upload.song.metadata.dto";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {FileMetadata} from "../../model/abstract/file.metadata";
import {BaseComponent} from "../../base-component/base-component";

@Component({
  selector: 'app-metadata-info-view',
  templateUrl: './metadata-info-view.component.html',
  styleUrls: ['./metadata-info-view.component.css']
})
export class MetadataInfoViewComponent extends BaseComponent {

  private musicMetadata: UploadSongMetadataDTO;
  private videoMetadata: UploadVideoMetadataDTO;
  private imageMetadata: UploadImageMetadataDTO;
  private ebookMetadata: UploadEbookMetadataDTO;

  @Input() private category: string;

  public metadata: FileMetadata;

  constructor() {
    super();
    this.metadata = new UploadSongMetadataDTO();
    this.category = 'M';
    this.imageMetadata = new UploadImageMetadataDTO();
    this.ebookMetadata = new UploadEbookMetadataDTO();
    this.musicMetadata = new UploadSongMetadataDTO();
    this.videoMetadata = new UploadVideoMetadataDTO();
  }

  ngOnInit(): void {
  }

  public setCurrentItem(): void {
    switch (this.category) {
      case 'M':
        this.musicMetadata = <UploadSongMetadataDTO>this.metadata;
        this.musicMetadata._song._rate = this.musicMetadata._song._rating / 10;
        break;
      case 'V':
        this.videoMetadata = <UploadVideoMetadataDTO>this.metadata;
        this.videoMetadata._video._rate = this.videoMetadata._video._rating / 10;
        break;
      case 'I':
        this.imageMetadata = <UploadImageMetadataDTO>this.metadata;
        this.imageMetadata._imageDTO._rate = this.imageMetadata._imageDTO._rating / 10;
        break;
      case 'E':
        this.ebookMetadata = <UploadEbookMetadataDTO>this.metadata;
        this.ebookMetadata._ebookDTO._rate = this.ebookMetadata._ebookDTO._rating / 10;
        break;
    }
  }

  /*Jawne przypisanie ze względu na to że jest szybsze niż event*/
  public setCategory(category: string): void {
    this.category = category;
  }

}
