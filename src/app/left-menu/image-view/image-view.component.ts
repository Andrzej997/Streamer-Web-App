import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {ImageDTO} from "../../model/image/image.dto";
import {MetadataInfoViewComponent} from "../../main_page/metadata-info-view/metadata-info-view.component";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {ModalDirective} from 'ng2-bootstrap';
import {ImageService} from "../../service/image-service/image.service";

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent extends BaseComponent {

  public imageList: ImageDTO[];

  @ViewChild('metadataModal') public metadataModal: ModalDirective;

  @ViewChild(MetadataInfoViewComponent)
  private metadataInfoView: MetadataInfoViewComponent;

  public selectedItem: UploadImageMetadataDTO;

  constructor(private imageService: ImageService) {
    super();
    this.imageList = [];
    this.selectedItem = new UploadImageMetadataDTO();
  }

  ngOnInit() {
    this.imageService.getImagesTop50().subscribe((value: ImageDTO[]) => {
      this.imageList = value;
    });
  }

  public onPlayClick(image: ImageDTO): void {

  }

  public onInfoItemClick(image: ImageDTO): void {
    this.selectedItem = new UploadImageMetadataDTO();
    this.selectedItem._imageDTO = image;
    this.metadataInfoView.metadata = this.selectedItem;
    this.metadataInfoView.setCurrentItem();
    this.metadataModal.show();
  }

  public hideMetadataModal(): void {
    this.metadataModal.hide();
  }


}
