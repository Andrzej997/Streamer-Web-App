import {Component, ViewChild, ElementRef} from "@angular/core";
import {BaseComponent} from "../../base-component/base-component";
import {ImageService} from "../../service/image-service/image.service";
import {ModalDirective} from "ng2-bootstrap";
import {ImageDTO} from "../../model/image/image.dto";
import {imageStreamAuthEndpoint, imageStreamEndpoint} from "../../constants";
import {RateImageDTO} from "../../model/image/rate.image.dto";

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent extends BaseComponent {

  @ViewChild('imageModal')
  public metadataModal: ModalDirective;

  @ViewChild('imageContent')
  public imageElement: ElementRef;

  public imageDTO: ImageDTO;
  public visible: boolean = false;
  public source: string = '';

  private imageComponent: HTMLImageElement;

  private authContext: boolean = false;
  private type: string;
  private rate: number = 0;

  constructor(private imageService: ImageService) {
    super();
    this.imageDTO = new ImageDTO();
  }

  public ngOnInit() {
  }

  public ngAfterViewInit(): void {
    this.imageComponent = this.imageElement.nativeElement;
  }

  private initModal(): void {
    if (this.authContext) {
      let username: string = localStorage.getItem('username');
      let authToken: string = localStorage.getItem('id_token');
      this.source = imageStreamAuthEndpoint
        + "?username=" + username + "&id=" + this.imageDTO._imageFileId + "&authToken=" + authToken;
    } else {
      this.source = imageStreamEndpoint + "?id=" + this.imageDTO._imageFileId;
    }
    this.type = "image/" + this.imageDTO._imageFileDTO._fileExtension;
    this.imageComponent.src = this.source;
  }

  public show(image: ImageDTO): void {
    this.saveRating();
    this.rate = 0;
    this.imageDTO = image;
    this.visible = true;
    this.initModal();
    this.metadataModal.show();
  }

  public hide(): void {
    this.visible = false;
    this.metadataModal.hide();
  }

  public onExit(): void {
    this.saveRating();
    this.hide();
  }

  public saveRating(): void {
    if (this.rate > 0) {
      let rateImageDTO: RateImageDTO = new RateImageDTO();
      rateImageDTO._rate = this.rate;
      rateImageDTO._imageId = this.imageDTO._imageId;
      this.imageService.rateImage(rateImageDTO).subscribe();
    }
  }

  public setAuthContext(value: boolean): void {
    this.authContext = value;
  }

}
