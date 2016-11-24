import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {MediaFileUploader} from '../../common/media.file.uploader';
import {ModalDirective} from 'ng2-bootstrap';
import {FileItem} from 'ng2-file-upload/file-upload/file-item.class';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent extends BaseComponent {

  @ViewChild('metadataModal') public metadataModal: ModalDirective;
  private selectedItem: FileItem;

  constructor(private uploader: MediaFileUploader) {
    super();
  }

  ngOnInit() {

  }

  public showMetadataModal(item: FileItem): void {
    this.selectedItem = item;
    this.metadataModal.show();
  }

  public hideMetadataModal(): void {
    this.metadataModal.hide();
  }
}
