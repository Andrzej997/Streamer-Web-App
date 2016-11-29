import {ImageDTO} from "./image.dto";
import {FileMetadata} from "../abstract/file.metadata";

export class UploadImageMetadataDTO implements FileMetadata {

  public _imageDTO: ImageDTO;
  public _username: string;

  constructor() {
    this._imageDTO = new ImageDTO();
  }

  public isValid(): boolean {
    if (this._username == null || this._imageDTO._title == null)
      return false;
    if (!this.validateFileMetadata())
      return false;
    if (this._imageDTO._title.length <= 0)
      return false;
    if (this._imageDTO._artistDTOList == null || this._imageDTO._artistDTOList.length <= 0)
      return false;
    if (this._imageDTO._artistDTOList[0]._name == null || this._imageDTO._artistDTOList[0]._surname == null)
      return false;
    return !(this._imageDTO._artistDTOList[0]._name.length <= 0 || this._imageDTO._artistDTOList[0]._surname.length <= 0);
  }

  private validateFileMetadata(): boolean {
    if (this._imageDTO._imageFileDTO._creationDate == null) {
      return false;
    }
    if (this._imageDTO._imageFileDTO._fileExtension == null) {
      return false;
    }
    if (this._imageDTO._imageFileDTO._fileName == null) {
      return false;
    }
    if (this._imageDTO._imageFileDTO._fileSize == null) {
      return false;
    }
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
