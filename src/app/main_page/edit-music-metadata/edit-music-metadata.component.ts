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

  constructor(private musicService: MusicService) {
    super();
    this.musicMetadata = new UploadSongMetadataDTO();
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
    this.musicMetadata = new UploadSongMetadataDTO();
  }

  private prepareMusicMetadata(): void {
    let data = this.musicMetadata.song.fileMetadata.fileName;
    if (data != null) {
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
    this.musicMetadata.song.authors.forEach((item: MusicArtistsDTO) => {
      if (item.name == null || item.name.length <= 0) {
        this.isAuthorsValid = false;
        return;
      }
      if (item.surname == null || item.surname.length <= 0) {
        this.isAuthorsValid = false;
        return;
      }
    });
    this.isAuthorsValid = true;
  }

}
