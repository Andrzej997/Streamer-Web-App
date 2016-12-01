import {Component, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {FileUtils} from '../../common/file.utils';
import {UploadSongMetadataDTO} from '../../model/music/upload.song.metadata.dto';
import {MusicService} from "../../service/music-service/music.service";
import {MusicArtistsDTO} from "../../model/music/music.artist.dto";
import {Observable} from 'rxjs';
import {MusicAlbumDTO} from "../../model/music/music.album.dto";
import {MusicGenreDTO} from "../../model/music/music.genre.dto";
import {MetadataFileItem} from "../../common/metadata.file.item";
import {TypeaheadMatch} from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

@Component({
  selector: 'app-edit-music-metadata',
  templateUrl: './edit-music-metadata.component.html',
  styleUrls: ['./edit-music-metadata.component.css']
})
export class EditMusicMetadataComponent extends BaseComponent {

  @Input() item: MetadataFileItem;
  private musicMetadata: UploadSongMetadataDTO;

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

  constructor(private musicService: MusicService) {
    super();
    this.musicMetadata = new UploadSongMetadataDTO();
    this.percent = 0;
  }

  ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let change = changes['item'];
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
    this.musicMetadata.song.fileMetadata.fileName = FileUtils.getFileName(this.item);
    this.musicMetadata.song.fileMetadata.extension = FileUtils.getExtension(this.item);
    this.musicMetadata.song.fileMetadata.fileSize = FileUtils.getFileSize(this.item);
    this.musicMetadata.song.fileMetadata.creationDate = FileUtils.getFileCreationDate(this.item);
    if (this.musicMetadata.song.fileMetadata.creationDate == null) {
      this.musicMetadata.song.fileMetadata.creationDate = new Date();
    }
    this.musicMetadata.song.title = FileUtils.getFileName(this.item);
    this.musicMetadata.song.productionYear = new Date().getFullYear();
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public onAddMusicAuthor(): void {
    let artist: MusicArtistsDTO = new MusicArtistsDTO();
    this.musicMetadata.song.authors.push(artist);
  }

  public onRemoveMusicAuthor(): void {
    this.musicMetadata.song.authors.pop();
    if (this.musicMetadata.song.authors.length <= 0) {
      this.isAuthorsValid = true;
    }
  }

  public onMusicAuthorInput(index: number): void {
    this.artistsTypeaheadList = new Observable<MusicArtistsDTO[]>(observer => {
      observer.next(this.musicMetadata.song.authors[index].name);
      observer.next(this.musicMetadata.song.authors[index].name2);
      observer.next(this.musicMetadata.song.authors[index].surname);
    }).mergeMap(() => this.getAristsPredictionList(index));
  }

  private getAristsPredictionList(index: number): Observable<MusicArtistsDTO[]> {
    let author = this.musicMetadata.song.authors[index];
    return this.musicService.getAristsPredictionList(author.name, author.name2, author.surname);
  }

  public onMusicAlbumInput(): void {
    this.albumsTypeaheadList = new Observable<MusicAlbumDTO[]>(observer => {
      observer.next(this.musicMetadata.song.album.albumTitle);
    }).mergeMap(() => this.getAlbumsPredictionList());
  }

  private getAlbumsPredictionList(): Observable<MusicAlbumDTO[]> {
    return this.musicService.getAlbumsPredictionList(this.musicMetadata.song.album.albumTitle,
      this.musicMetadata.song.title);
  }

  public onMusicGenreInput(): void {
    this.genresTypeaheadList = new Observable<MusicGenreDTO[]>(observer => {
      observer.next(this.musicMetadata.song.genre.name);
    }).mergeMap(() => this.getGenresPredictionList());
  }

  private getGenresPredictionList(): Observable<MusicGenreDTO[]> {
    return this.musicService.getGenresPredictionList(this.musicMetadata.song.genre.name);
  }

  public onSave() {
    this.musicMetadata.song.rating = this.percent;
    this.musicMetadata.song.ratingTimes = 1;
    this.musicMetadata.userName = localStorage.getItem('username');
    this.item.metadata = this.musicMetadata;
    this.hide.emit(true);
  }

  public checkAuthorsValidation(): void {
    if (this.musicMetadata.song.authors == null) {
      this.isAuthorsValid = true;
      return;
    }
    if (this.musicMetadata.song.authors.length <= 0) {
      this.isAuthorsValid = true;
      return;
    }
    let itemIsValid: boolean = true;
    this.musicMetadata.song.authors.forEach((item: MusicArtistsDTO) => {
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
    this.musicMetadata.song.authors[index] = <MusicArtistsDTO>match.item;
    this.checkAuthorsValidation();
  }

  public onTypeaheadAlbumSelect(match: TypeaheadMatch): void {
    this.musicMetadata.song._album = <MusicAlbumDTO>match.item;
  }

  public onTypeaheadGenreSelect(match: TypeaheadMatch): void {
    this.musicMetadata.song._genre = <MusicGenreDTO>match.item;
  }

  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / 10);
  };

  public resetStar(): void {
    this.overStar = void 0;
  }
}
