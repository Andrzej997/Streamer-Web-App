import {SongDTO} from './song.dto';

export class UploadSongMetadataDTO {

  private _song: SongDTO;

  private _userName: string;

  constructor() {
    this._song = new SongDTO();
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
