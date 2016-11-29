export class MusicArtistsDTO {

  public _authorId: number;
  public _name: string;
  public _name2: string;
  public _surname: string;
  public _birthYear: number;
  public _deathYear: number;
  public _comments: string;
  public _ratings: number;


  get authorId(): number {
    return this._authorId;
  }

  set authorId(value: number) {
    this._authorId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get name2(): string {
    return this._name2;
  }

  set name2(value: string) {
    this._name2 = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get birthYear(): number {
    return this._birthYear;
  }

  set birthYear(value: number) {
    this._birthYear = value;
  }

  get deathYear(): number {
    return this._deathYear;
  }

  set deathYear(value: number) {
    this._deathYear = value;
  }


  get comments(): string {
    return this._comments;
  }

  set comments(value: string) {
    this._comments = value;
  }

  get ratings(): number {
    return this._ratings;
  }

  set ratings(value: number) {
    this._ratings = value;
  }

}
