import {Component} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {MediaFileUploader} from "../../common/media.file.uploader";

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent extends BaseComponent {

  constructor(private uploader: MediaFileUploader) {
    super();
  }

  ngOnInit() {
  }

}
