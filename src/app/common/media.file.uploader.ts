import {OnInit} from '@angular/core';
import {FileUploader, FileUploaderOptions, FilterFunction, ParsedResponseHeaders} from 'ng2-file-upload';
import {FileItem} from 'ng2-file-upload/file-upload/file-item.class';
import * as constants from '../constants';
import {MusicService} from "../service/music-service/music.service";
import {MetadataFileItem} from "./metadata.file.item";
import {FileMetadata} from "../model/abstract/file.metadata";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadSongMetadataDTO} from '../model/music/upload.song.metadata.dto';
import {UploadVideoMetadataDTO} from "../model/video/upload.video.metadata.dto";
import {VideoService} from "../service/video-service/video.service";

@Injectable()
export class MediaFileUploader extends FileUploader implements OnInit {

  private _endpoint: string = constants.serverEndpoint;
  private _category: string = 'M';
  private _oldCategory: string;
  private _musicQueue: Array<MetadataFileItem>;
  private _videoQueue: Array<MetadataFileItem>;
  private _imageQueue: Array<MetadataFileItem>;
  private _ebookQueue: Array<MetadataFileItem>;
  private _uploadOptions: FileUploaderOptions = {
    authTokenHeader: 'AuthHeader',
    authToken: localStorage.getItem('id_token'), disableMultipart: false,
    isHTML5: true
  };
  private _typeFilter: string = 'audio/*';

  constructor(private musicService: MusicService,
              private videoService: VideoService) {
    super({});
    this.musicQueue = [];
    this.videoQueue = [];
    this.imageQueue = [];
    this.ebookQueue = [];
    this.changeEndpoint();
  }

  public ngOnInit(): void {
  }

  public saveOldQueue(): void {
    switch (this._endpoint) {
      case constants.musicUploadEndpoint:
        this.oldCategory = 'M';
        this.musicQueue = this.queue;
        break;
      case constants.videoUploadEndpoint:
        this.oldCategory = 'V';
        this.videoQueue = this.queue;
        break;
      case constants.ebookUploadEndpoint:
        this.oldCategory = 'E';
        this.ebookQueue = this.queue;
        break;
      case constants.imageUploadEndpoint:
        this.oldCategory = 'I';
        this.imageQueue = this.queue;
        break;
      default:
        break;
    }
  }


  public changeEndpoint(): void {
    this.saveOldQueue();
    switch (this.category) {
      case 'M':
        this.endpoint = constants.musicUploadEndpoint;
        this.queue = this.musicQueue;
        this.typeFilter = 'audio/*';
        break;
      case 'V':
        this.endpoint = constants.videoUploadEndpoint;
        this.queue = this.videoQueue;
        this.typeFilter = 'video/*';
        break;
      case 'E':
        this.endpoint = constants.ebookUploadEndpoint;
        this.queue = this.ebookQueue;
        this.typeFilter = '.pdf';
        break;
      case 'I':
        this.endpoint = constants.imageUploadEndpoint;
        this.queue = this.imageQueue;
        this.typeFilter = 'image/*';
        break;
      default:
        this.endpoint = constants.serverEndpoint;
        break;
    }
    this.changeUrl();
  }

  public changeUrl() {
    this.uploadOptions.url = this.endpoint;
    this.setOptions(this.uploadOptions);
  }

  public onAfterAddingFile(fileItem: FileItem): any {
    let index: number = this.getIndexOfItem(fileItem);
    var item: MetadataFileItem = <MetadataFileItem> fileItem;
    item.metadata = this.createMetadata();
    this.queue[index] = item;
    super.onAfterAddingFile(fileItem);
  }

  public createMetadata(): FileMetadata {
    switch (this.category) {
      case 'M':
        return new UploadSongMetadataDTO();
      case 'V':
        return new UploadVideoMetadataDTO();
      case 'I':
        return null;
      case 'E':
        return null;
      default:
        return null;
    }
  }

  public uploadAll(): void {
    super.uploadAll();
  }

  public uploadItem(item: MetadataFileItem): void {
    super.uploadItem(item);
  }

  public onCompleteItem(item: MetadataFileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    switch (this.category) {
      case 'M':
        this.onCompleteItemMusic(item, response, status, headers);
      case 'V':
        this.onCompleteItemVideo(item, response, status, headers);
      case 'I':
        return null;
      case 'E':
        return null;
    }
  }

  public onCompleteItemMusic(item: MetadataFileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let id: number = parseInt(response);
    (<UploadSongMetadataDTO>item.metadata).song.fileId = id;
    (<UploadSongMetadataDTO>item.metadata).song.fileMetadata.musicFileId = id;
    this.saveMetadata(item).subscribe((value: UploadSongMetadataDTO) => {
      if (value == null) {
        console.log('Error !');
      }
    })
  }

  public onCompleteItemVideo(item: MetadataFileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let id: number = parseInt(response);
    (<UploadVideoMetadataDTO>item.metadata).video.videoFileId = id;
    (<UploadVideoMetadataDTO>item.metadata).video.videoFileMetadata.videoFileId = id;
    this.saveMetadata(item).subscribe((value: UploadVideoMetadataDTO) => {
      if (value == null) {
        console.log('Error !');
      }
    });
  }

  public checkValidation(): boolean {
    if (this.queue.length > 0) {
      this.queue.forEach((item: MetadataFileItem) => {
        if (!item.metadata.isValid()) {
          return false;
        }
      });
    }
    return true;
  }

  public saveMetadata(file: MetadataFileItem): Observable<FileMetadata> {
    switch (this.category) {
      case 'M':
        return this.musicService.saveMusicFileMetadata(<UploadSongMetadataDTO>file.metadata);
      case 'V':
        return this.videoService.saveVideoFileMetadata(<UploadVideoMetadataDTO>file.metadata);
      case 'I':
        return null;
      case 'E':
        return null;
    }
  }

  get uploadOptions(): FileUploaderOptions {
    return this._uploadOptions;
  }

  set uploadOptions(value: FileUploaderOptions) {
    this._uploadOptions = value;
  }

  get typeFilter(): string {
    return this._typeFilter;
  }

  set typeFilter(value: string) {
    this._typeFilter = value;
  }

  get endpoint(): string {
    return this._endpoint;
  }

  set endpoint(value: string) {
    this._endpoint = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
    this.changeEndpoint();
  }

  get oldCategory(): string {
    return this._oldCategory;
  }

  set oldCategory(value: string) {
    this._oldCategory = value;
  }


  get musicQueue(): Array<any> {
    return this._musicQueue;
  }

  set musicQueue(value: Array<any>) {
    this._musicQueue = value;
  }

  get videoQueue(): Array<any> {
    return this._videoQueue;
  }

  set videoQueue(value: Array<any>) {
    this._videoQueue = value;
  }

  get imageQueue(): Array<any> {
    return this._imageQueue;
  }

  set imageQueue(value: Array<any>) {
    this._imageQueue = value;
  }

  get ebookQueue(): Array<any> {
    return this._ebookQueue;
  }

  set ebookQueue(value: Array<any>) {
    this._ebookQueue = value;
  }
}
