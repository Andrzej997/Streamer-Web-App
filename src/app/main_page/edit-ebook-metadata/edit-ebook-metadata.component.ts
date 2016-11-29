import {Component, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {MetadataFileItem} from "../../common/metadata.file.item";
import {WriterDTO} from "../../model/ebook/writer.dto";
import {LiteraryGenreDTO} from "../../model/ebook/literary.genre.dto";
import {EbookService} from "../../service/ebook-service/ebook.service";
import {FileUtils} from "../../common/file.utils";
import {Observable} from 'rxjs';
import {TypeaheadMatch} from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

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

  constructor(private ebookService: EbookService) {
    super();
    this.ebookMetadata = new UploadEbookMetadataDTO();
  }

  public ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let change = changes['item'];
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
    this.ebookMetadata.ebookDTO.ebookFileMetadataDTO.fileName = FileUtils.getFileName(this.item);
    this.ebookMetadata.ebookDTO.ebookFileMetadataDTO.extension = FileUtils.getExtension(this.item);
    this.ebookMetadata.ebookDTO.ebookFileMetadataDTO.fileSize = FileUtils.getFileSize(this.item);
    this.ebookMetadata.ebookDTO.ebookFileMetadataDTO.creationDate = FileUtils.getFileCreationDate(this.item);
    if (this.ebookMetadata.ebookDTO.ebookFileMetadataDTO.creationDate == null) {
      this.ebookMetadata.ebookDTO.ebookFileMetadataDTO.creationDate = new Date();
    }
    this.ebookMetadata.ebookDTO.title = FileUtils.getFileName(this.item);
    this.ebookMetadata.ebookDTO.year = new Date().getFullYear();
  }

  public onSave() {
    this.ebookMetadata.username = localStorage.getItem('username');
    this.item.metadata = this.ebookMetadata;
    this.hide.emit(true);
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public onAddWriter(): void {
    let writer: WriterDTO = new WriterDTO();
    this.ebookMetadata.ebookDTO.writerDTOList.push(writer);
  }

  public onRemoveWriter(): void {
    this.ebookMetadata.ebookDTO.writerDTOList.pop();
    if (this.ebookMetadata.ebookDTO.writerDTOList.length <= 0) {
      this.isWritersValid = true;
    }
  }

  public onWritersInput(index: number): void {
    this.writersTypeaheadList = new Observable<WriterDTO[]>(observer => {
      observer.next(this.ebookMetadata.ebookDTO.writerDTOList[index].name);
      observer.next(this.ebookMetadata.ebookDTO.writerDTOList[index].name2);
      observer.next(this.ebookMetadata.ebookDTO.writerDTOList[index].surname);
    }).mergeMap(() => this.getWritersPredictionList(index));
  }

  private getWritersPredictionList(index: number): Observable<WriterDTO[]> {
    let author = this.ebookMetadata.ebookDTO.writerDTOList[index];
    return this.ebookService.getWritersPredictionList(author.name, author.name2, author.surname);
  }

  public onLiteraryTypeInput(): void {
    this.literaryGenresTypeaheadList = new Observable<LiteraryGenreDTO[]>(observer => {
      observer.next(this.ebookMetadata.ebookDTO.literaryGenreDTO.name);
    }).mergeMap(() => this.getLiteraryTypesByPrediction());
  }

  private getLiteraryTypesByPrediction(): Observable<LiteraryGenreDTO[]> {
    return this.ebookService.getLiteraryGenresPredictionList(this.ebookMetadata.ebookDTO.literaryGenreDTO.name);
  }

  public checkWritersValidation(): void {
    if (this.ebookMetadata.ebookDTO.writerDTOList == null) {
      this.isWritersValid = true;
      return;
    }
    if (this.ebookMetadata.ebookDTO.writerDTOList.length <= 0) {
      this.isWritersValid = true;
      return;
    }
    let isItemValid: boolean = true;
    this.ebookMetadata.ebookDTO.writerDTOList.forEach((item: WriterDTO) => {
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
    this.ebookMetadata.ebookDTO.writerDTOList[index] = <WriterDTO> match.item;
    this.checkWritersValidation();
  }

  public onTypeaheadGenreSelect(match: TypeaheadMatch): void {
    this.ebookMetadata.ebookDTO.literaryGenreDTO = <LiteraryGenreDTO> match.item;
  }

}
