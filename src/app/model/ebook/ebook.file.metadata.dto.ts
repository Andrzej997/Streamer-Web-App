export class EbookFileMetadataDTO {

  public _ebookFileId: number;
  public _fileName: string;
  public _fileSize: number;
  public _extension: string;
  public _creationDate: Date;
  public _isPublic: boolean;

  constructor() {
  }

  get ebookFileId(): number {
    return this._ebookFileId;
  }

  set ebookFileId(value: number) {
    this._ebookFileId = value;
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

  get extension(): string {
    return this._extension;
  }

  set extension(value: string) {
    this._extension = value;
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
