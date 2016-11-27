import {VideoDTO} from "./video.dto";
import {FileMetadata} from "../abstract/file.metadata";

export class UploadVideoMetadataDTO implements FileMetadata {

  private _video: VideoDTO;
  private _username: string;

  constructor() {
    this._video = new VideoDTO();
  }

  public isValid(): boolean {
    return true;
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
