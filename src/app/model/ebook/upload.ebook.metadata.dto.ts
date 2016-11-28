import {EbookDTO} from "./ebook.dto";
import {FileMetadata} from "../abstract/file.metadata";

export class UploadEbookMetadataDTO implements FileMetadata {

  private _ebookDTO: EbookDTO;
  private _username: string;

  constructor() {
    this._ebookDTO = new EbookDTO();
  }

  public isValid(): boolean {
    return true;
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
