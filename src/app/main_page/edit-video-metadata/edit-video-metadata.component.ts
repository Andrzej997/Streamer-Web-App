import {Component, SimpleChanges, Input, Output, EventEmitter} from "@angular/core";
import {MetadataFileItem} from "../../common/metadata.file.item";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {Observable} from "rxjs";
import {DirectorDTO} from "../../model/video/director.dto";
import {VideoSerieDTO} from "../../model/video/video.serie.dto";
import {FilmGenreDTO} from "../../model/video/film.genre.dto";
import {BaseComponent} from "../../base-component/base-component";
import {VideoService} from "../../service/video-service/video.service";
import {FileUtils} from "../../common/file.utils";
import {TypeaheadMatch} from "ng2-bootstrap/typeahead/typeahead-match.class";
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
    this.videoMetadata._video._videoFileMetadata._fileName = FileUtils.getFileName(this.item);
    this.videoMetadata._video._videoFileMetadata._extension = FileUtils.getExtension(this.item);
    this.videoMetadata._video._videoFileMetadata._fileSize = FileUtils.getFileSize(this.item);
    this.videoMetadata._video._videoFileMetadata._creationDate = FileUtils.getFileCreationDate(this.item);
    if (this.videoMetadata._video._videoFileMetadata._creationDate == null) {
      this.videoMetadata._video._videoFileMetadata._creationDate = new Date();
    }
    this.videoMetadata._video._title = FileUtils.getFileName(this.item);
    this.videoMetadata._video._productionYear = new Date().getFullYear();
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public onSave() {
    if (!this.isEdit) {
      this.videoMetadata._video._rating = this.percent;
      this.videoMetadata._video._ratingTimes = 1;
      this.videoMetadata._username = localStorage.getItem('username');
      this.item.metadata = this.videoMetadata;
    } else {
      let rating: number = this.videoMetadata._video._rating;
      let times: number = this.videoMetadata._video._ratingTimes;
      let result: number = rating * times + this.percent;
      result = result / (times + 1);
      this.videoMetadata._video._rating = result;
      this.videoMetadata._video._ratingTimes = times + 1;
    }
    this.hide.emit(true);
  }

  public checkAuthorsValidation(): void {
    if (this.videoMetadata._video._directorList == null) {
      this.isDirectorsValid = true;
      return;
    }
    if (this.videoMetadata._video._directorList.length <= 0) {
      this.isDirectorsValid = true;
      return;
    }
    let isItemValid: boolean = true;
    this.videoMetadata._video._directorList.forEach((item: DirectorDTO) => {
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
    this.videoMetadata._video._directorList.push(director);
  }

  public onRemoveDirector(): void {
    this.videoMetadata._video._directorList.pop();
    if (this.videoMetadata._video._directorList.length <= 0) {
      this.isDirectorsValid = true;
    }
  }

  public onDirectorsInput(index: number): void {
    this.directorsTypeaheadList = new Observable<DirectorDTO[]>((observer: any) => {
      observer.next(this.videoMetadata._video._directorList[index]._name);
      observer.next(this.videoMetadata._video._directorList[index]._name2);
      observer.next(this.videoMetadata._video._directorList[index]._surname);
    }).mergeMap(() => this.getDirectorsPredictionList(index));
  }

  private getDirectorsPredictionList(index: number): Observable<DirectorDTO[]> {
    let director = this.videoMetadata._video._directorList[index];
    return this.videoService.getDirectorsPredictionList(director._name, director._name2, director._surname);
  }

  public onVideoSeriesInput(): void {
    this.videoSeriesTypeahedList = new Observable<VideoSerieDTO[]>((observer: any) => {
      observer.next(this.videoMetadata._video._videoSerie._title);
    }).mergeMap(() => this.getVideoSeriesPredictionList());
  }

  private getVideoSeriesPredictionList(): Observable<VideoSerieDTO[]> {
    return this.videoService.getVideoSeriesPredictionList(this.videoMetadata._video._videoSerie._title,
      this.videoMetadata._video._title);
  }

  public onFilmGenreInput(): void {
    this.filmGenresTypeaheadList = new Observable<FilmGenreDTO[]>((observer: any) => {
      observer.next(this.videoMetadata._video._filmGenre._name);
    }).mergeMap(() => this.getGenresPredictionList());
  }

  private getGenresPredictionList(): Observable<FilmGenreDTO[]> {
    return this.videoService.getGenresPredictionList(this.videoMetadata._video._filmGenre._name);
  }

  public onTypeaheadDirectorSelect(match: TypeaheadMatch, index: number): void {
    this.videoMetadata._video._directorList[index] = <DirectorDTO>match.item;
    this.checkAuthorsValidation();
  }

  public onTypeaheadSerieSelect(match: TypeaheadMatch): void {
    this.videoMetadata._video._videoSerie = <VideoSerieDTO>match.item;
  }

  public onTypeaheadGenreSelect(match: TypeaheadMatch): void {
    this.videoMetadata._video._filmGenre = <FilmGenreDTO>match.item;
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
