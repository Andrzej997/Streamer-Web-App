import {Component, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from "../../base-component/base-component";
import {ImageDTO} from "../../model/image/image.dto";
import {MetadataInfoViewComponent} from "../../main_page/metadata-info-view/metadata-info-view.component";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {ModalDirective} from "ng2-bootstrap";
import {ImageService} from "../../service/image-service/image.service";
import {SearchCriteria} from "../../view-objects/search.criteria";
import {Observable} from "rxjs";
import {SnackBarComponent} from "../../components/snack-bar/snack-bar.component";

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

  public criteria: SearchCriteria;

  @ViewChild('snackImageView')
  private snackbar: SnackBarComponent;

  constructor(private imageService: ImageService,
              private route: ActivatedRoute) {
    super();
    this.imageList = [];
    this.selectedItem = new UploadImageMetadataDTO();
  }

  ngOnInit() {
    let criteriaParam: Observable<string> = this.route.queryParams.map(params => params['criteria'] || '');
    if (criteriaParam == null) {
      return;
    }
    criteriaParam.subscribe((value: string) => {
      if (value == null || value.length <= 0) {
        this.imageService.getImagesTop50().subscribe((value: ImageDTO[]) => {
          value.forEach((item: ImageDTO) => item._rate = item._rating / 10);
          this.imageList = value;
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
      this.imageService.searchImagesByCriteria(criteria).subscribe((value: ImageDTO[]) => {
        value.forEach((item: ImageDTO) => item._rate = item._rating / 10);
        this.imageList = value;
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
