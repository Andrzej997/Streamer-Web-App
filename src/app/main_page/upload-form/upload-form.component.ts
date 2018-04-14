import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {MediaFileUploader} from '../../common/media.file.uploader';
import {ModalDirective} from 'ngx-bootstrap';
import {MetadataFileItem} from '../../common/metadata.file.item';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent extends BaseComponent {

  @ViewChild('metadataModal') public metadataModal: ModalDirective;
  private selectedItem: MetadataFileItem;
  private _isAllItemsValid: boolean = false;

  constructor(private uploader: MediaFileUploader) {
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
