import {Component, Input, SimpleChanges} from '@angular/core';
import {FileItem} from 'ng2-file-upload/file-upload/file-item.class';
import {BaseComponent} from '../../../base-component/base-component';
import {FileUtils} from '../../../common/file.utils';
import {UploadSongMetadataDTO} from '../../../model/music/upload.song.metadata.dto';
import {MusicService} from "../../../service/music-service/music.service";
import {MusicArtistsDTO} from "../../../model/music/music.artist.dto";
import {Observable} from 'rxjs';
import {MusicAlbumDTO} from "../../../model/music/music.album.dto";
import {MusicGenreDTO} from "../../../model/music/music.genre.dto";
import {MusicFileMetadataDTO} from "../../../model/music/music.file.metadata.dto";

@Component({
  selector: 'app-file-metadata-form',
  templateUrl: './file-metadata-form.component.html',
  styleUrls: ['./file-metadata-form.component.css']
})
export class FileMetadataFormComponent extends BaseComponent {

  @Input() item: FileItem;
  private musicMetadata: UploadSongMetadataDTO;
  @Input() visible: boolean;

  public typeaheadLoading: boolean = false;

  private artistsTypeaheadList: Observable<MusicArtistsDTO[]>;
  private albumsTypeaheadList: Observable<MusicAlbumDTO[]>;
  private genresTypeaheadList: Observable<MusicGenreDTO[]>;

  constructor(private musicService: MusicService) {
    super();
    this.musicMetadata = new UploadSongMetadataDTO();
  }

  ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let change = changes['visible'];
    let current = change.currentValue;
    let previous = change.previousValue;
    if (current !== previous && current === true && this.item != null) {
      this.prepareMusicMetadata();
    }
  }

  private prepareForm(): void {
    this.musicMetadata = new UploadSongMetadataDTO();
  }

  private prepareMusicMetadata(): void {
    this.musicMetadata.song.fileMetadata.fileName = FileUtils.getFileName(this.item);
    this.musicMetadata.song.fileMetadata.extension = FileUtils.getExtension(this.item);
    this.musicMetadata.song.fileMetadata.fileSize = FileUtils.getFileSize(this.item);
    this.musicMetadata.song.fileMetadata.creationDate = FileUtils.getFileCreationDate(this.item);
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

}
