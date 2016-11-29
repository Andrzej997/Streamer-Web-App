export class ImageTypeDTO {

  public _typeId: number;
  public _name: string;
  public _comments: string;

  constructor() {

  }

  get typeId(): number {
    return this._typeId;
  }

  set typeId(value: number) {
    this._typeId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get comments(): string {
    return this._comments;
  }

  set comments(value: string) {
    this._comments = value;
  }
}
