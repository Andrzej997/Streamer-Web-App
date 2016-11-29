import {EbookDTO} from "./ebook.dto";
import {FileMetadata} from "../abstract/file.metadata";

export class UploadEbookMetadataDTO implements FileMetadata {

  public _ebookDTO: EbookDTO;
  public _username: string;

  constructor() {
    this._ebookDTO = new EbookDTO();
  }

  public isValid(): boolean {
    if (this._username == null || this._ebookDTO._title == null)
      return false;
    if (!this.validateFileMetadata())
      return false;
    if (this._ebookDTO._title.length <= 0)
      return false;
    if (this._ebookDTO._writerDTOList == null || this._ebookDTO._writerDTOList.length <= 0)
      return false;
    if (this._ebookDTO._writerDTOList[0]._name == null || this._ebookDTO._writerDTOList[0]._surname == null)
      return false;
    return !(this._ebookDTO._writerDTOList[0]._name.length <= 0 || this._ebookDTO._writerDTOList[0]._surname.length <= 0);
  }

  private validateFileMetadata(): boolean {
    if (this._ebookDTO._ebookFileMetadataDTO._creationDate == null) {
      return false;
    }
    if (this._ebookDTO._ebookFileMetadataDTO._extension == null) {
      return false;
    }
    if (this._ebookDTO._ebookFileMetadataDTO._fileName == null) {
      return false;
    }
    return !(this._ebookDTO._ebookFileMetadataDTO._fileSize == null);
  }

  get ebookDTO(): EbookDTO {
    return this._ebookDTO;
  }

  set ebookDTO(value: EbookDTO) {
    this._ebookDTO = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
