import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import * as constants from '../constants';


export class MediaFileUploader extends FileUploader {

  private _endpoint: string = constants.serverEndpoint;
  private _category: string = 'M';
  private _uploadOptions: FileUploaderOptions = {
    authTokenHeader: 'AuthHeader',
    authToken: localStorage.getItem('id_token'), disableMultipart: false
  };
  private _typeFilter: string = 'audio/*';

  constructor() {
    super({});
  }

  public changeEndpoint() {
    switch (this._category) {
      case 'M':
        this._endpoint = constants.musicUploadEndpoint;
        break;
      case 'V':
        this._endpoint = constants.videoUploadEndpoint;
        break;
      case 'E':
        this._endpoint = constants.ebookUploadEndpoint;
        break;
      case 'I':
        this._endpoint = constants.imageUploadEndpoint;
        break;
      default:
        this._endpoint = constants.serverEndpoint;
        break;
    }
    this.changeUrl();
    this.changeTypeFilter();
  }

  public changeTypeFilter() {
    switch (this._category) {
      case 'M':
        this._typeFilter = 'audio/*';
        break;
      case 'V':
        this._typeFilter = 'video/*';
        break;
      case 'E':
        this._typeFilter = '.pdf';
        break;
      case 'I':
        this._typeFilter = 'image/*';
        break;
      default:
        this._typeFilter = 'audio/*';
        break;
    }
  }

  public changeUrl() {
    this._uploadOptions.url = this._endpoint;
    this.setOptions(this._uploadOptions);
  }


  get typeFilter(): string {
    return this._typeFilter;
  }

  set typeFilter(value: string) {
    this._typeFilter = value;
  }

  get endpoint(): string {
    return this._endpoint;
  }

  set endpoint(value: string) {
    this._endpoint = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
    this.changeEndpoint();
  }
}
