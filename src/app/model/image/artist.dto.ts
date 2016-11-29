export class ArtistDTO {
  public _artistId: number;
  public _name: string;
  public _name2: string;
  public _surname: string;
  public _birthYear: Date;
  public _deathYear: Date;
  public _comments: string;
  public _ratings: number;

  constructor() {

  }

  get artistId(): number {
    return this._artistId;
  }

  set artistId(value: number) {
    this._artistId = value;
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

  get birthYear(): Date {
    return this._birthYear;
  }

  set birthYear(value: Date) {
    this._birthYear = value;
  }

  get deathYear(): Date {
    return this._deathYear;
  }

  set deathYear(value: Date) {
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
