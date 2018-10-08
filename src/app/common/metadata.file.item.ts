import {FileItem} from 'ng2-file-upload/file-upload/file-item.class';
import {FileUploaderOptions} from 'ng2-file-upload';
import {MediaFileUploader} from './media.file.uploader';
import {FileMetadata} from '../model/abstract/file.metadata';

export class MetadataFileItem extends FileItem {

  private _metadata: FileMetadata;

  constructor(uploader: MediaFileUploader,
              some: File,
              options: FileUploaderOptions) {
    super(uploader, some, options);
  }


  get metadata(): FileMetadata {
    return this._metadata;
  }

  set metadata(value: FileMetadata) {
    this._metadata = value;
  }
}
