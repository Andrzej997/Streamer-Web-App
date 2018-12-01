import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {MediaFileUploader} from '../../common/media.file.uploader';
import {ModalDirective} from 'ngx-bootstrap';
import {MetadataFileItem} from '../../common/metadata.file.item';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent extends BaseComponent {

  @ViewChild('metadataModal') public metadataModal: ModalDirective;
  selectedItem: MetadataFileItem;
  _isAllItemsValid: boolean = false;

  musicEnabled = environment.musicEnabled;
  ebookEnabled = environment.ebookEnabled;
  imageEnabled = environment.imageEnabled;
  videoEnabled = environment.videoEnabled;

  constructor(public uploader: MediaFileUploader) {
    super();
  }

  public ngOnInit() {

  }

  public showMetadataModal(item: MetadataFileItem): void {
    this.selectedItem = item;
    this.metadataModal.show();
  }

  public hideMetadataModal(): void {
    this.metadataModal.hide();
    this._isAllItemsValid = this.uploader.checkValidation();
  }
}
