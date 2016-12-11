import {Component, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from "../../base-component/base-component";
import {EbookDTO} from "../../model/ebook/ebook.dto";
import {MetadataInfoViewComponent} from "../../main_page/metadata-info-view/metadata-info-view.component";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {ModalDirective} from "ng2-bootstrap";
import {EbookService} from "../../service/ebook-service/ebook.service";
import {SearchCriteria} from "../../view-objects/search.criteria";
import {Observable} from "rxjs";
import {SnackBarComponent} from "../../components/snack-bar/snack-bar.component";
import {EbookModalComponent} from "../../components/ebook-modal/ebook-modal.component";

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

  public criteria: SearchCriteria;

  @ViewChild('snackEbookView')
  private snackbar: SnackBarComponent;

  @ViewChild('ebookEbookView')
  private ebookModal: EbookModalComponent;

  constructor(private ebookService: EbookService,
              private route: ActivatedRoute) {
    super();
    this.ebookList = [];
    this.selectedItem = new UploadEbookMetadataDTO();
  }

  ngOnInit() {
    let criteriaParam: Observable<string> = this.route.queryParams.map(params => params['criteria'] || '');
    if (criteriaParam == null) {
      return;
    }
    criteriaParam.subscribe((value: string) => {
      if (value == null || value.length <= 0) {
        this.ebookService.getEbooksTop50().subscribe((value: EbookDTO[]) => {
          value.forEach((item: EbookDTO) => item._rate = item._rating / 10);
          this.ebookList = value;
          if (value == null || value.length <= 0) {
            this.showSnackBarNotFoundError();
          }
        }, (error) => {
          this.showSnackBarNotFoundError();
        });
        return;
      }
      let criteria: SearchCriteria = SearchCriteria.fromJSON(value);
      if (criteria == null) {
        return;
      }
      this.ebookService.searchEbooksByCriteria(criteria).subscribe((value: EbookDTO[]) => {
        value.forEach((item: EbookDTO) => item._rate = item._rating / 10);
        this.ebookList = value;
        if (value == null || value.length <= 0) {
          this.showSnackBarNotFoundError();
        }
      }, (error) => {
        this.showSnackBarNotFoundError();
      })
    });
  }

  public showSnackBarNotFoundError(): void {
    this.snackbar._timeout = 3000;
    this.snackbar._message = 'Nothing found';
    this.snackbar.showSnackMessageError();
  }

  public onPlayClick(ebook: EbookDTO): void {
    this.ebookModal.show(ebook);
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
