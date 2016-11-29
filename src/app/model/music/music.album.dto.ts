export class MusicAlbumDTO {

  public _albumId: number;
  public _albumTitle: string;
  public _albumYear: number;
  public _comments: string;


  constructor() {
  }

  get albumId(): number {
    return this._albumId;
  }

  set albumId(value: number) {
    this._albumId = value;
  }

  get albumTitle(): string {
    return this._albumTitle;
  }

  set albumTitle(value: string) {
    this._albumTitle = value;
  }

  get albumYear(): number {
    return this._albumYear;
  }

  set albumYear(value: number) {
    this._albumYear = value;
  }

  get comments(): string {
    return this._comments;
  }

  set comments(value: string) {
    this._comments = value;
  }
}
