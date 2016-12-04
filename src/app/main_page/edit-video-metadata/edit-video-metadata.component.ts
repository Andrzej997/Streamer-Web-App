import {Component, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {MetadataFileItem} from "../../common/metadata.file.item";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {Observable} from 'rxjs';
import {DirectorDTO} from "../../model/video/director.dto";
import {VideoSerieDTO} from "../../model/video/video.serie.dto";
import {FilmGenreDTO} from "../../model/video/film.genre.dto";
import {BaseComponent} from "../../base-component/base-component";
import {VideoService} from "../../service/video-service/video.service";
import {FileUtils} from "../../common/file.utils";
import {TypeaheadMatch} from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import {VideoDTO} from "../../model/video/video.dto";

@Component({
  selector: 'app-edit-video-metadata',
  templateUrl: './edit-video-metadata.component.html',
  styleUrls: ['./edit-video-metadata.component.css']
})
export class EditVideoMetadataComponent extends BaseComponent {

  @Input() item: MetadataFileItem;
  @Output() hide = new EventEmitter<boolean>();

  private videoMetadata: UploadVideoMetadataDTO;

  public typeaheadLoading: boolean = false;
  public directorsTypeaheadList: Observable<DirectorDTO[]>;
  public videoSeriesTypeahedList: Observable<VideoSerieDTO[]>;
  public filmGenresTypeaheadList: Observable<FilmGenreDTO[]>;

  private isDirectorsValid: boolean = true;

  public overStar: number;
  public percent: number;
  public rate: number;
  public maxRate: number = 10;

  @Input() isVisible: boolean = true;
  @Input() isEdit: boolean = false;

  constructor(private videoService: VideoService) {
    super();
    this.videoMetadata = new UploadVideoMetadataDTO();
    this.percent = 0;
  }

  public ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges) {
    let change = changes['item'];
    if (change == null) {
      return;
    }
    let current = change.currentValue;
    let previous = change.previousValue;
    if (current !== previous) {
      this.prepareForm();
      this.prepareVideoMetadata();
    }
  }

  private prepareForm(): void {
    if (this.item == null) {
      return;
    }
    if (this.item.metadata != null && this.item.metadata.isValid()) {
      this.videoMetadata = <UploadVideoMetadataDTO>this.item.metadata;
      return;
    }
    this.videoMetadata = new UploadVideoMetadataDTO();
  }

  private prepareVideoMetadata(): void {
    let isValid = this.videoMetadata.isValid();
    if (isValid) {
      return;
    }
    this.videoMetadata.video.videoFileMetadata.fileName = FileUtils.getFileName(this.item);
    this.videoMetadata.video.videoFileMetadata.extension = FileUtils.getExtension(this.item);
    this.videoMetadata.video.videoFileMetadata.fileSize = FileUtils.getFileSize(this.item);
    this.videoMetadata.video.videoFileMetadata.creationDate = FileUtils.getFileCreationDate(this.item);
    if (this.videoMetadata.video.videoFileMetadata.creationDate == null) {
      this.videoMetadata.video.videoFileMetadata.creationDate = new Date();
    }
    this.videoMetadata.video.title = FileUtils.getFileName(this.item);
    this.videoMetadata.video.productionYear = new Date().getFullYear();
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public onSave() {
    if (!this.isEdit) {
      this.videoMetadata.video.rating = this.percent;
      this.videoMetadata.video.ratingTimes = 1;
      this.videoMetadata.username = localStorage.getItem('username');
      this.item.metadata = this.videoMetadata;
    }
    this.hide.emit(true);
  }

  public checkAuthorsValidation(): void {
    if (this.videoMetadata.video.directorList == null) {
      this.isDirectorsValid = true;
      return;
    }
    if (this.videoMetadata.video.directorList.length <= 0) {
      this.isDirectorsValid = true;
      return;
    }
    let isItemValid: boolean = true;
    this.videoMetadata.video.directorList.forEach((item: DirectorDTO) => {
      if (item._name == null || item._name.length <= 0) {
        isItemValid = false;
        return;
      }
      if (item._surname == null || item._surname.length <= 0) {
        isItemValid = false;
        return;
      }
    });
    this.isDirectorsValid = isItemValid;
  }

  public onAddDirector(): void {
    let director: DirectorDTO = new DirectorDTO();
    this.videoMetadata.video.directorList.push(director);
  }

  public onRemoveDirector(): void {
    this.videoMetadata.video.directorList.pop();
    if (this.videoMetadata.video.directorList.length <= 0) {
      this.isDirectorsValid = true;
    }
  }

  public onDirectorsInput(index: number): void {
    this.directorsTypeaheadList = new Observable<DirectorDTO[]>(observer => {
      observer.next(this.videoMetadata.video.directorList[index].name);
      observer.next(this.videoMetadata.video.directorList[index].name2);
      observer.next(this.videoMetadata.video.directorList[index].surname);
    }).mergeMap(() => this.getDirectorsPredictionList(index));
  }

  private getDirectorsPredictionList(index: number): Observable<DirectorDTO[]> {
    let director = this.videoMetadata.video.directorList[index];
    return this.videoService.getDirectorsPredictionList(director.name, director.name2, director.surname);
  }

  public onVideoSeriesInput(): void {
    this.videoSeriesTypeahedList = new Observable<VideoSerieDTO[]>(observer => {
      observer.next(this.videoMetadata.video.videoSerie.title);
    }).mergeMap(() => this.getVideoSeriesPredictionList());
  }

  private getVideoSeriesPredictionList(): Observable<VideoSerieDTO[]> {
    return this.videoService.getVideoSeriesPredictionList(this.videoMetadata.video.videoSerie.title,
      this.videoMetadata.video.title);
  }

  public onFilmGenreInput(): void {
    this.filmGenresTypeaheadList = new Observable<FilmGenreDTO[]>(observer => {
      observer.next(this.videoMetadata.video.filmGenre.name);
    }).mergeMap(() => this.getGenresPredictionList());
  }

  private getGenresPredictionList(): Observable<FilmGenreDTO[]> {
    return this.videoService.getGenresPredictionList(this.videoMetadata.video.filmGenre.name);
  }

  public onTypeaheadDirectorSelect(match: TypeaheadMatch, index: number): void {
    this.videoMetadata.video.directorList[index] = <DirectorDTO>match.item;
    this.checkAuthorsValidation();
  }

  public onTypeaheadSerieSelect(match: TypeaheadMatch): void {
    this.videoMetadata.video.videoSerie = <VideoSerieDTO>match.item;
  }

  public onTypeaheadGenreSelect(match: TypeaheadMatch): void {
    this.videoMetadata.video.filmGenre = <FilmGenreDTO>match.item;
  }

  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / 10);
  };

  public resetStar(): void {
    this.overStar = void 0;
  }

  public setMetadata(item: UploadVideoMetadataDTO): void {
    this.videoMetadata = item;
  }

  public getMetadata(): VideoDTO {
    return this.videoMetadata._video;
  }

}
