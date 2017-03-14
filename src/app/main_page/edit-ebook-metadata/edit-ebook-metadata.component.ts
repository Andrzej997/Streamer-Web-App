import {Component, SimpleChanges, Input, Output, EventEmitter} from "@angular/core";
import {BaseComponent} from "../../base-component/base-component";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {MetadataFileItem} from "../../common/metadata.file.item";
import {WriterDTO} from "../../model/ebook/writer.dto";
import {LiteraryGenreDTO} from "../../model/ebook/literary.genre.dto";
import {EbookService} from "../../service/ebook-service/ebook.service";
import {FileUtils} from "../../common/file.utils";
import {Observable} from "rxjs";
import {TypeaheadMatch} from "ng2-bootstrap/typeahead/typeahead-match.class";
import {EbookDTO} from "../../model/ebook/ebook.dto";

@Component({
  selector: 'app-edit-ebook-metadata',
  templateUrl: './edit-ebook-metadata.component.html',
  styleUrls: ['./edit-ebook-metadata.component.css']
})
export class EditEbookMetadataComponent extends BaseComponent {

  @Input() item: MetadataFileItem;
  private ebookMetadata: UploadEbookMetadataDTO;

  @Output() hide = new EventEmitter<boolean>();

  public typeaheadLoading: boolean = false;
  private writersTypeaheadList: Observable<WriterDTO[]>;
  private literaryGenresTypeaheadList: Observable<LiteraryGenreDTO[]>;

  private isWritersValid: boolean = true;

  public overStar: number;
  public percent: number;
  public rate: number;
  public maxRate: number = 10;

  @Input() isVisible: boolean = true;
  @Input() isEdit: boolean = false;

  constructor(private ebookService: EbookService) {
    super();
    this.ebookMetadata = new UploadEbookMetadataDTO();
    this.percent = 0;
  }

  public ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let change = changes['item'];
    if (change == null) {
      return;
    }
    let current = change.currentValue;
    let previous = change.previousValue;
    if (current !== previous) {
      this.prepareFrom();
      this.prepareMusicMetadata();
    }
  }

  public prepareFrom(): void {
    if (this.item == null) {
      return;
    }
    if (this.item.metadata != null && this.item.metadata.isValid()) {
      this.ebookMetadata = <UploadEbookMetadataDTO>this.item.metadata;
      return;
    }
    this.ebookMetadata = new UploadEbookMetadataDTO();
  }

  public prepareMusicMetadata() {
    let isValid = this.ebookMetadata.isValid();
    if (isValid) {
      return;
    }
    this.ebookMetadata._ebookDTO._ebookFileMetadataDTO._fileName = FileUtils.getFileName(this.item);
    this.ebookMetadata._ebookDTO._ebookFileMetadataDTO._extension = FileUtils.getExtension(this.item);
    this.ebookMetadata._ebookDTO._ebookFileMetadataDTO._fileSize = FileUtils.getFileSize(this.item);
    this.ebookMetadata._ebookDTO._ebookFileMetadataDTO._creationDate = FileUtils.getFileCreationDate(this.item);
    if (this.ebookMetadata._ebookDTO._ebookFileMetadataDTO._creationDate == null) {
      this.ebookMetadata._ebookDTO._ebookFileMetadataDTO._creationDate = new Date();
    }
    this.ebookMetadata._ebookDTO._title = FileUtils.getFileName(this.item);
    this.ebookMetadata._ebookDTO._year = new Date().getFullYear();
  }

  public onSave() {
    if (!this.isEdit) {
      this.ebookMetadata._ebookDTO._rating = this.percent;
      this.ebookMetadata._ebookDTO._ratingTimes = 1;
      this.ebookMetadata._username = localStorage.getItem('username');
      this.item.metadata = this.ebookMetadata;
    } else {
      let rating: number = this.ebookMetadata._ebookDTO._rating;
      let times: number = this.ebookMetadata._ebookDTO._ratingTimes;
      let result: number = rating * times + this.percent;
      result = result / (times + 1);
      this.ebookMetadata._ebookDTO._rating = result;
      this.ebookMetadata._ebookDTO._ratingTimes = times + 1;
    }
    this.hide.emit(true);
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public onAddWriter(): void {
    let writer: WriterDTO = new WriterDTO();
    this.ebookMetadata._ebookDTO._writerDTOList.push(writer);
  }

  public onRemoveWriter(): void {
    this.ebookMetadata._ebookDTO._writerDTOList.pop();
    if (this.ebookMetadata._ebookDTO._writerDTOList.length <= 0) {
      this.isWritersValid = true;
    }
  }

  public onWritersInput(index: number): void {
    this.writersTypeaheadList = new Observable<WriterDTO[]>((observer: any) => {
      observer.next(this.ebookMetadata._ebookDTO._writerDTOList[index]._name);
      observer.next(this.ebookMetadata._ebookDTO._writerDTOList[index]._name2);
      observer.next(this.ebookMetadata._ebookDTO._writerDTOList[index]._surname);
    }).mergeMap(() => this.getWritersPredictionList(index));
  }

  private getWritersPredictionList(index: number): Observable<WriterDTO[]> {
    let author = this.ebookMetadata._ebookDTO._writerDTOList[index];
    return this.ebookService.getWritersPredictionList(author._name, author._name2, author._surname);
  }

  public onLiteraryTypeInput(): void {
    this.literaryGenresTypeaheadList = new Observable<LiteraryGenreDTO[]>((observer: any) => {
      observer.next(this.ebookMetadata._ebookDTO._literaryGenreDTO._name);
    }).mergeMap(() => this.getLiteraryTypesByPrediction());
  }

  private getLiteraryTypesByPrediction(): Observable<LiteraryGenreDTO[]> {
    return this.ebookService.getLiteraryGenresPredictionList(this.ebookMetadata._ebookDTO._literaryGenreDTO._name);
  }

  public checkWritersValidation(): void {
    if (this.ebookMetadata._ebookDTO._writerDTOList == null) {
      this.isWritersValid = true;
      return;
    }
    if (this.ebookMetadata._ebookDTO._writerDTOList.length <= 0) {
      this.isWritersValid = true;
      return;
    }
    let isItemValid: boolean = true;
    this.ebookMetadata._ebookDTO._writerDTOList.forEach((item: WriterDTO) => {
      if (item._name == null || item._name.length <= 0) {
        isItemValid = false;
        return;
      }
      if (item._surname == null || item._surname.length <= 0) {
        isItemValid = false;
        return;
      }
    });
    this.isWritersValid = isItemValid;
  }

  public onTypeaheadWriterSelect(match: TypeaheadMatch, index: number): void {
    this.ebookMetadata._ebookDTO._writerDTOList[index] = <WriterDTO> match.item;
    this.checkWritersValidation();
  }

  public onTypeaheadGenreSelect(match: TypeaheadMatch): void {
    this.ebookMetadata._ebookDTO._literaryGenreDTO = <LiteraryGenreDTO> match.item;
  }

  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / 10);
  };

  public resetStar(): void {
    this.overStar = void 0;
  }

  public setMetadata(item: UploadEbookMetadataDTO): void {
    this.ebookMetadata = item;
  }

  public getMetadata(): EbookDTO {
    return this.ebookMetadata._ebookDTO;
  }

}
