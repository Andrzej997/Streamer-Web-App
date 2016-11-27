import {SongDTO} from './song.dto';
import {FileMetadata} from "../abstract/file.metadata";

export class UploadSongMetadataDTO implements FileMetadata {

  private _song: SongDTO;

  private _userName: string;

  constructor() {
    this._song = new SongDTO();
  }

  public isValid(): boolean {
    if (this._userName == null || this.song.title == null)
      return false;
    if (this.song.title.length <= 0)
      return false;
    if (this.song.authors == null || this.song.authors.length <= 0)
      return false;
    if (this.song.authors[0].name == null || this.song.authors[0].surname == null)
      return false;
    if (this.song.authors[0].name.length <= 0 || this.song.authors[0].surname.length <= 0)
      return false;
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
