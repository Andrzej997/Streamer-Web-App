import {VideoDTO} from './video.dto';
import {FileMetadata} from '../abstract/file.metadata';

export class UploadVideoMetadataDTO implements FileMetadata {

  public _video: VideoDTO;
  public _username: string;

  constructor() {
    this._username = localStorage.getItem('username');
    this._video = new VideoDTO();
  }

  public isValid(): boolean {
    if (this._username == null || this._video._title == null) {
      return false;
    }
    if (!this.validateFileMetadata()) {
      return false;
    }
    if (this._video._title.length <= 0) {
      return false;
    }
    if (this._video._directorList == null || this._video._directorList.length <= 0) {
      return false;
    }
    if (this._video._directorList[0]._name == null || this._video._directorList[0]._surname == null) {
      return false;
    }
    return !(this._video._directorList[0]._name.length <= 0 || this._video._directorList[0]._surname.length <= 0);
  }

  private validateFileMetadata(): boolean {
    if (this._video._videoFileMetadata._creationDate == null) {
      return false;
    }
    if (this._video._videoFileMetadata._extension == null) {
      return false;
    }
    if (this._video._videoFileMetadata._fileName == null) {
      return false;
    }
    return this._video._videoFileMetadata._fileSize != null;

  }

  get video(): VideoDTO {
    return this._video;
  }

  set video(value: VideoDTO) {
    this._video = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
