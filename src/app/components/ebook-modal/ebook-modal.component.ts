import {Component, ViewChild, ElementRef} from "@angular/core";
import {BaseComponent} from "../../base-component/base-component";
import {ModalDirective} from "ng2-bootstrap";
import {EbookService} from "../../service/ebook-service/ebook.service";
import {EbookDTO} from "../../model/ebook/ebook.dto";
import {ebookStreamAuthEndpoint, ebookStreamEndpoint} from "../../constants";
import {RateEbookDTO} from "../../model/ebook/rate.ebook.dto";

@Component({
  selector: 'app-ebook-modal',
  templateUrl: './ebook-modal.component.html',
  styleUrls: ['./ebook-modal.component.css']
})
export class EbookModalComponent extends BaseComponent {

  @ViewChild('ebookModal')
  public metadataModal: ModalDirective;

  @ViewChild('ebookContent')
  public ebookElement: ElementRef;

  public ebookDTO: EbookDTO;
  public visible: boolean = false;
  public source: string = '';

  private ebookComponent: HTMLEmbedElement;

  private authContext: boolean = false;
  private rate: number = 0;

  constructor(private ebookService: EbookService) {
    super();
    this.ebookDTO = new EbookDTO();
  }

  public ngOnInit() {
  }

  public ngAfterViewInit(): void {
    this.ebookComponent = this.ebookElement.nativeElement;
  }

  private initModal(): void {
    if (this.authContext) {
      let username: string = localStorage.getItem('username');
      let authToken: string = localStorage.getItem('id_token');
      this.source = ebookStreamAuthEndpoint
        + "?username=" + username + "&id=" + this.ebookDTO._ebookFileId + "&authToken=" + authToken;
    } else {
      this.source = ebookStreamEndpoint + "?id=" + this.ebookDTO._ebookFileId;
    }
    this.ebookComponent.src = this.source;
  }

  public show(ebook: EbookDTO): void {
    this.saveRating();
    this.rate = 0;
    this.ebookDTO = ebook;
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
      let rateEbookDTO: RateEbookDTO = new RateEbookDTO();
      rateEbookDTO._rate = this.rate;
      rateEbookDTO._ebookId = this.ebookDTO._ebookId;
      this.ebookService.rateEbook(rateEbookDTO).subscribe();
      this.rate = 0;
    }
  }

  public setAuthContext(value: boolean): void {
    this.authContext = value;
  }

}
