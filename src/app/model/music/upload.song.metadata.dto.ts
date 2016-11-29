import {SongDTO} from './song.dto';
import {FileMetadata} from "../abstract/file.metadata";

export class UploadSongMetadataDTO implements FileMetadata {

  public _song: SongDTO;

  public _userName: string;

  constructor() {
    this._song = new SongDTO();
  }

  public isValid(): boolean {
    if (this._userName == null || this._song._title == null)
      return false;
    if (!this.validateFileMetadata())
      return false;
    if (this._song._title.length <= 0)
      return false;
    if (this._song._authors == null || this._song._authors.length <= 0)
      return false;
    if (this._song._authors[0]._name == null || this._song._authors[0]._surname == null)
      return false;
    return !(this._song._authors[0]._name.length <= 0 || this._song._authors[0]._surname.length <= 0);
  }

  private validateFileMetadata(): boolean {
    if (this._song._fileMetadata._creationDate == null) {
      return false;
    }
    if (this._song._fileMetadata._extension == null) {
      return false;
    }
    if (this._song._fileMetadata._fileName == null) {
      return false;
    }
    if (this._song._fileMetadata._fileSize == null) {
      return false;
    }
    return true;
  }


  get song(): SongDTO {
    return this._song;
  }

  set song(value: SongDTO) {
    this._song = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }
}
