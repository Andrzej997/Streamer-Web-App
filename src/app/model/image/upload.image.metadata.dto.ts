import {ImageDTO} from "./image.dto";
import {FileMetadata} from "../abstract/file.metadata";

export class UploadImageMetadataDTO implements FileMetadata {

  private _imageDTO: ImageDTO;
  private _username: string;

  constructor() {
    this._imageDTO = new ImageDTO();
  }

  public isValid(): boolean {
    return true;
  }

  get imageDTO(): ImageDTO {
    return this._imageDTO;
  }

  set imageDTO(value: ImageDTO) {
    this._imageDTO = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
