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

  constructor(private videoService: VideoService) {
    super();
    this.videoMetadata = new UploadVideoMetadataDTO();
  }

  public ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges) {
    let change = changes['item'];
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
    this.videoMetadata = new UploadVideoMetadataDTO();
  }

  private prepareVideoMetadata(): void {
    let data = this.videoMetadata.video.videoFileMetadata.fileName;
    if (data != null) {
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
    this.videoMetadata.username = localStorage.getItem('username');
    this.item.metadata = this.videoMetadata;
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
    this.videoMetadata.video.directorList.forEach((item: DirectorDTO) => {
      if (item.name == null || item.name.length <= 0) {
        this.isDirectorsValid = false;
        return;
      }
      if (item.surname == null || item.surname.length <= 0) {
        this.isDirectorsValid = false;
        return;
      }
    });
    this.isDirectorsValid = true;
  }

  public onAddDirector(): void {
    let director: DirectorDTO = new DirectorDTO();
    this.videoMetadata.video.directorList.push(director);
  }

  public onRemoveDirector(): void {
    this.videoMetadata.video.directorList.pop();
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

}
