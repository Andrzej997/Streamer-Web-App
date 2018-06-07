export class VideoFileMetadataDTO {

  public _videoFileId: number;
  public _fileName: string;
  public _fileSize: number;
  public _extension: string;
  public _creationDate: Date;
  public _isPublic: boolean;
  public _resolution: string;

  constructor() {

  }

  get videoFileId(): number {
    return this._videoFileId;
  }

  set videoFileId(value: number) {
    this._videoFileId = value;
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

  get resolution(): string {
    return this._resolution;
  }

  set resolution(value: string) {
    this._resolution = value;
  }
}
