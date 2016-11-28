import {Component, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {MetadataFileItem} from "../../common/metadata.file.item";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {ArtistDTO} from "../../model/image/artist.dto";
import {Observable} from 'rxjs';
import {ImageTypeDTO} from "../../model/image/image.type.dto";
import {ImageService} from "../../service/image-service/image.service";
import {FileUtils} from "../../common/file.utils";

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

  constructor(private imageService: ImageService) {
    super();
    this.imageMetadata = new UploadImageMetadataDTO();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
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
    this.imageMetadata = new UploadImageMetadataDTO();
  }

  public prepareMusicMetadata() {
    let data = this.imageMetadata.imageDTO.imageFileDTO.fileName;
    if (data != null) {
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
    this.imageMetadata.username = localStorage.getItem('username');
    this.item.metadata = this.imageMetadata;
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
    this.imageMetadata.imageDTO.artistDTOList.forEach((item: ArtistDTO) => {
      if (item.name == null || item.name.length <= 0) {
        this.isArtistsValid = false;
        return;
      }
      if (item.surname == null || item.surname.length <= 0) {
        this.isArtistsValid = false;
        return;
      }
    });
    this.isArtistsValid = true;
  }

}
