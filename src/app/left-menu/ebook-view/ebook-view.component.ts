import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {EbookDTO} from "../../model/ebook/ebook.dto";
import {MetadataInfoViewComponent} from "../../main_page/metadata-info-view/metadata-info-view.component";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {ModalDirective} from 'ng2-bootstrap';
import {EbookService} from "../../service/ebook-service/ebook.service";

@Component({
  selector: 'app-ebook-view',
  templateUrl: './ebook-view.component.html',
  styleUrls: ['./ebook-view.component.css']
})
export class EbookViewComponent extends BaseComponent {

  public ebookList: EbookDTO[];

  @ViewChild('metadataModal') public metadataModal: ModalDirective;

  @ViewChild(MetadataInfoViewComponent)
  private metadataInfoView: MetadataInfoViewComponent;

  public selectedItem: UploadEbookMetadataDTO;

  constructor(private ebookService: EbookService) {
    super();
    this.ebookList = [];
    this.selectedItem = new UploadEbookMetadataDTO();
  }

  ngOnInit() {
    this.ebookService.getEbooksTop50().subscribe((value: EbookDTO[]) => {
      this.ebookList = value;
    })
  }

  public onPlayClick(ebook: EbookDTO): void {

  }

  public onInfoItemClick(ebook: EbookDTO): void {
    this.selectedItem = new UploadEbookMetadataDTO();
    this.selectedItem._ebookDTO = ebook;
    this.metadataInfoView.metadata = this.selectedItem;
    this.metadataInfoView.setCurrentItem();
    this.metadataModal.show();
  }

  public hideMetadataModal(): void {
    this.metadataModal.hide();
  }

}
