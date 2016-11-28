export class LiteraryGenreDTO {
  private _genreId: number;
  private _name: string;
  private _comments: number;


  constructor() {
  }

  get genreId(): number {
    return this._genreId;
  }

  set genreId(value: number) {
    this._genreId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get comments(): number {
    return this._comments;
  }

  set comments(value: number) {
    this._comments = value;
  }
}
