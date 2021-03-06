export class ImageFileDTO {

  public _imageFileId: number;
  public _fileName: string;
  public _fileSize: number;
  public _fileExtension: string;
  public _creationDate: Date;
  public _isPublic: boolean;

  constructor() {

  }

  get imageFileId(): number {
    return this._imageFileId;
  }

  set imageFileId(value: number) {
    this._imageFileId = value;
  }

  get fileName(): string {
    return this._fileName;
  }

  set fileName(value: string) {
    this._fileName = value;
  }

  get fileSize(): number {
    return this._fileSize;
  }

  set fileSize(value: number) {
    this._fileSize = value;
  }

  get fileExtension(): string {
    return this._fileExtension;
  }

  set fileExtension(value: string) {
    this._fileExtension = value;
  }

  get creationDate(): Date {
    return this._creationDate;
  }

  set creationDate(value: Date) {
    this._creationDate = value;
  }

  get isPublic(): boolean {
    return this._isPublic;
  }

  set isPublic(value: boolean) {
    this._isPublic = value;
  }
}

