import {Component, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {FileUtils} from '../../common/file.utils';
import {UploadSongMetadataDTO} from '../../model/music/upload.song.metadata.dto';
import {MusicService} from '../../service/music-service/music.service';
import {MusicArtistsDTO} from '../../model/music/music.artist.dto';
import {Observable} from 'rxjs';
import {MusicAlbumDTO} from '../../model/music/music.album.dto';
import {MusicGenreDTO} from '../../model/music/music.genre.dto';
import {MetadataFileItem} from '../../common/metadata.file.item';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {SongDTO} from '../../model/music/song.dto';

@Component({
  selector: 'app-edit-music-metadata',
  templateUrl: './edit-music-metadata.component.html',
  styleUrls: ['./edit-music-metadata.component.css']
})
export class EditMusicMetadataComponent extends BaseComponent {

  @Input() item: MetadataFileItem;
  public musicMetadata: UploadSongMetadataDTO;

  @Output() hide = new EventEmitter<boolean>();

  public typeaheadLoading: boolean = false;

  private artistsTypeaheadList: Observable<MusicArtistsDTO[]>;
  private albumsTypeaheadList: Observable<MusicAlbumDTO[]>;
  private genresTypeaheadList: Observable<MusicGenreDTO[]>;

  private isAuthorsValid: boolean = true;

  public overStar: number;
  public percent: number;
  public rate: number;
  public maxRate: number = 10;

  @Input() isVisible: boolean = true;
  @Input() isEdit: boolean = false;

  constructor(private musicService: MusicService) {
    super();
    this.musicMetadata = new UploadSongMetadataDTO();
    this.percent = 0;
  }

  ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let change = changes['item'];
    if (change == null) {
      return;
    }
    let current = change.currentValue;
    let previous = change.previousValue;
    if (current !== previous) {
      this.prepareForm();
      this.prepareMusicMetadata();
    }
  }

  private prepareForm(): void {
    if (this.item == null) {
      return;
    }
    if (this.item.metadata != null && this.item.metadata.isValid()) {
      this.musicMetadata = <UploadSongMetadataDTO>this.item.metadata;
      return;
    }
    this.musicMetadata = new UploadSongMetadataDTO();
  }

  private prepareMusicMetadata(): void {
    let isValid: boolean = this.musicMetadata.isValid();
    if (isValid) {
      return;
    }
    this.musicMetadata._song._fileMetadata._fileName = FileUtils.getFileName(this.item);
    this.musicMetadata._song._fileMetadata._extension = FileUtils.getExtension(this.item);
    this.musicMetadata._song._fileMetadata._fileSize = FileUtils.getFileSize(this.item);
    this.musicMetadata._song._fileMetadata._creationDate = FileUtils.getFileCreationDate(this.item);
    if (this.musicMetadata._song._fileMetadata._creationDate == null) {
      this.musicMetadata._song._fileMetadata._creationDate = new Date();
    }
    this.musicMetadata._song._title = FileUtils.getFileName(this.item);
    this.musicMetadata._song._productionYear = new Date().getFullYear();
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public onAddMusicAuthor(): void {
    let artist: MusicArtistsDTO = new MusicArtistsDTO();
    this.musicMetadata._song._authors.push(artist);
  }

  public onRemoveMusicAuthor(): void {
    this.musicMetadata._song._authors.pop();
    if (this.musicMetadata._song._authors.length <= 0) {
      this.isAuthorsValid = true;
    }
  }

  public onMusicAuthorInput(index: number): void {
    this.artistsTypeaheadList = new Observable<MusicArtistsDTO[]>((observer: any) => {
      observer.next(this.musicMetadata._song._authors[index]._name);
      observer.next(this.musicMetadata._song._authors[index]._name2);
      observer.next(this.musicMetadata._song._authors[index]._surname);
    }).mergeMap(() => this.getAristsPredictionList(index));
  }

  private getAristsPredictionList(index: number): Observable<MusicArtistsDTO[]> {
    let author = this.musicMetadata._song._authors[index];
    return this.musicService.getAristsPredictionList(author._name, author._name2, author._surname);
  }

  public onMusicAlbumInput(): void {
    this.albumsTypeaheadList = new Observable<MusicAlbumDTO[]>((observer: any) => {
      observer.next(this.musicMetadata._song._album._albumTitle);
    }).mergeMap(() => this.getAlbumsPredictionList());
  }

  private getAlbumsPredictionList(): Observable<MusicAlbumDTO[]> {
    return this.musicService.getAlbumsPredictionList(this.musicMetadata._song._album._albumTitle,
      this.musicMetadata._song._title);
  }

  public onMusicGenreInput(): void {
    this.genresTypeaheadList = new Observable<MusicGenreDTO[]>((observer: any) => {
      observer.next(this.musicMetadata._song._genre._name);
    }).mergeMap(() => this.getGenresPredictionList());
  }

  private getGenresPredictionList(): Observable<MusicGenreDTO[]> {
    return this.musicService.getGenresPredictionList(this.musicMetadata._song._genre._name);
  }

  public onSave() {
    if (!this.isEdit) {
      this.musicMetadata._song._rating = this.percent;
      this.musicMetadata._song._ratingTimes = 1;
      this.musicMetadata._userName = localStorage.getItem('username');
      this.item.metadata = this.musicMetadata;
    } else {
      let rating: number = this.musicMetadata._song._rating;
      let times: number = this.musicMetadata._song._ratingTimes;
      let result: number = rating * times + this.percent;
      result = result / (times + 1);
      this.musicMetadata._song._rating = result;
      this.musicMetadata._song._ratingTimes = times + 1;
    }
    this.hide.emit(true);
  }

  public checkAuthorsValidation(): void {
    if (this.musicMetadata._song._authors == null) {
      this.isAuthorsValid = true;
      return;
    }
    if (this.musicMetadata._song._authors.length <= 0) {
      this.isAuthorsValid = true;
      return;
    }
    let itemIsValid: boolean = true;
    this.musicMetadata._song._authors.forEach((item: MusicArtistsDTO) => {
      if (item._name == null || item._name.length <= 0) {
        itemIsValid = false;
        return;
      }
      if (item._surname == null || item._surname.length <= 0) {
        itemIsValid = false;
        return;
      }
    });
    this.isAuthorsValid = itemIsValid;
  }

  public onTypeaheadAuthorSelect(match: TypeaheadMatch, index: number): void {
    this.musicMetadata._song._authors[index] = <MusicArtistsDTO>match.item;
    this.checkAuthorsValidation();
  }

  public onTypeaheadAlbumSelect(match: TypeaheadMatch): void {
    this.musicMetadata._song._album = <MusicAlbumDTO>match.item;
  }

  public onTypeaheadGenreSelect(match: TypeaheadMatch): void {
    this.musicMetadata._song._genre = <MusicGenreDTO>match.item;
  }

  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / 10);
  };

  public resetStar(): void {
    this.overStar = void 0;
  }

  public setMetadata(item: UploadSongMetadataDTO): void {
    this.musicMetadata = item;
    this.setRate();
  }

  public getMetadata(): SongDTO {
    return this.musicMetadata._song;
  }

  public setRate(): void {
    this.rate = this.musicMetadata._song._rating / 10;
  }

}
