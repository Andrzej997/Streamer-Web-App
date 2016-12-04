import {Component, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {MetadataFileItem} from "../../common/metadata.file.item";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {ArtistDTO} from "../../model/image/artist.dto";
import {Observable} from 'rxjs';
import {ImageTypeDTO} from "../../model/image/image.type.dto";
import {ImageService} from "../../service/image-service/image.service";
import {FileUtils} from "../../common/file.utils";
import {TypeaheadMatch} from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import {ImageDTO} from "../../model/image/image.dto";

@Component({
  selector: 'app-edit-image-metadata',
  templateUrl: './edit-image-metadata.component.html',
  styleUrls: ['./edit-image-metadata.component.css']
})
export class EditImageMetadataComponent extends BaseComponent {

  @Input() item: MetadataFileItem;
  private imageMetadata: UploadImageMetadataDTO;

  @Output() hide = new EventEmitter<boolean>();

  public typeaheadLoading: boolean = false;
  private artistsTypeaheadList: Observable<ArtistDTO[]>;
  private imageTypesTypeaheadList: Observable<ImageTypeDTO[]>;

  private isArtistsValid: boolean = true;

  public overStar: number;
  public percent: number;
  public rate: number;
  public maxRate: number = 10;

  @Input() isVisible: boolean = true;
  @Input() isEdit: boolean = false;

  constructor(private imageService: ImageService) {
    super();
    this.imageMetadata = new UploadImageMetadataDTO();
    this.percent = 0;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
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
      this.imageMetadata = <UploadImageMetadataDTO>this.item.metadata;
      return;
    }
    this.imageMetadata = new UploadImageMetadataDTO();
  }

  public prepareMusicMetadata() {
    let isValid: boolean = this.imageMetadata.isValid();
    if (isValid) {
      return;
    }
    this.imageMetadata.imageDTO.imageFileDTO.fileName = FileUtils.getFileName(this.item);
    this.imageMetadata.imageDTO.imageFileDTO.fileExtension = FileUtils.getExtension(this.item);
    this.imageMetadata.imageDTO.imageFileDTO.fileSize = FileUtils.getFileSize(this.item);
    this.imageMetadata.imageDTO.imageFileDTO.creationDate = FileUtils.getFileCreationDate(this.item);
    if (this.imageMetadata.imageDTO.imageFileDTO.creationDate == null) {
      this.imageMetadata.imageDTO.imageFileDTO.creationDate = new Date();
    }
    this.imageMetadata.imageDTO.title = FileUtils.getFileName(this.item);
    this.imageMetadata.imageDTO.year = new Date().getFullYear();
  }

  public onSave() {
    if (!this.isEdit) {
      this.imageMetadata.imageDTO.rating = this.percent;
      this.imageMetadata.imageDTO.ratingTimes = 1;
      this.imageMetadata.username = localStorage.getItem('username');
      this.item.metadata = this.imageMetadata;
    }
    this.hide.emit(true);
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public onAddArtist(): void {
    let artist: ArtistDTO = new ArtistDTO();
    this.imageMetadata.imageDTO.artistDTOList.push(artist);
  }

  public onRemoveArtist(): void {
    this.imageMetadata.imageDTO.artistDTOList.pop();
    if (this.imageMetadata.imageDTO.artistDTOList.length <= 0) {
      this.isArtistsValid = true;
    }
  }

  public onArtistInput(index: number): void {
    this.artistsTypeaheadList = new Observable<ArtistDTO[]>(observer => {
      observer.next(this.imageMetadata.imageDTO.artistDTOList[index].name);
      observer.next(this.imageMetadata.imageDTO.artistDTOList[index].name2);
      observer.next(this.imageMetadata.imageDTO.artistDTOList[index].surname);
    }).mergeMap(() => this.getAristsPredictionList(index));
  }

  private getAristsPredictionList(index: number): Observable<ArtistDTO[]> {
    let author = this.imageMetadata.imageDTO.artistDTOList[index];
    return this.imageService.getArtistPredictionList(author.name, author.name2, author.surname);
  }

  public onImageTypeInput(): void {
    this.imageTypesTypeaheadList = new Observable<ImageTypeDTO[]>(observer => {
      observer.next(this.imageMetadata.imageDTO.imageTypeDTO.name);
    }).mergeMap(() => this.getImageTypesByPrediction());
  }

  private getImageTypesByPrediction(): Observable<ImageTypeDTO[]> {
    return this.imageService.getImageTypesByPrediction(this.imageMetadata.imageDTO.imageTypeDTO.name);
  }

  public checkArtistsValidation(): void {
    if (this.imageMetadata.imageDTO.artistDTOList == null) {
      this.isArtistsValid = true;
      return;
    }
    if (this.imageMetadata.imageDTO.artistDTOList.length <= 0) {
      this.isArtistsValid = true;
      return;
    }
    let isItemValid: boolean = true;
    this.imageMetadata.imageDTO.artistDTOList.forEach((item: ArtistDTO) => {
      if (item._name == null || item._name.length <= 0) {
        isItemValid = false;
        return;
      }
      if (item._surname == null || item._surname.length <= 0) {
        isItemValid = false;
        return;
      }
    });
    this.isArtistsValid = isItemValid;
  }

  public onTypeaheadArtistSelect(match: TypeaheadMatch, index: number): void {
    this.imageMetadata.imageDTO.artistDTOList[index] = <ArtistDTO> match.item;
    this.checkArtistsValidation();
  }

  public onTypeaheadTypeSelect(match: TypeaheadMatch): void {
    this.imageMetadata.imageDTO.imageTypeDTO = <ImageTypeDTO> match.item;
  }

  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / 10);
  };

  public resetStar(): void {
    this.overStar = void 0;
  }

  public setMetadata(item: UploadImageMetadataDTO): void {
    this.imageMetadata = item;
  }

  public getMetadata(): ImageDTO {
    return this.imageMetadata._imageDTO;
  }

}
