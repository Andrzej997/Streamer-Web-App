import {MusicArtistsDTO} from './music.artist.dto';
import {MusicFileMetadataDTO} from './music.file.metadata.dto';
import {MusicGenreDTO} from './music.genre.dto';
import {MusicAlbumDTO} from './music.album.dto';

export class SongDTO {

  private _songId: number;
  private _title: string;
  private _fileId: number;
  private _authorId: number;
  private _albumId: number;
  private _musicGenreId: number;
  private _rating: number;
  private _productionYear: number;
  private _ownerId: number;
  private _authors: MusicArtistsDTO[];
  private _fileMetadata: MusicFileMetadataDTO;
  private _genre: MusicGenreDTO;
  private _album: MusicAlbumDTO;

  constructor() {
    this._authors = new Array();
    this._fileMetadata = new MusicFileMetadataDTO();
    this._genre = new MusicGenreDTO();
    this._album = new MusicAlbumDTO();
  }

  get songId(): number {
    return this._songId;
  }

  set songId(value: number) {
    this._songId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get fileId(): number {
    return this._fileId;
  }

  set fileId(value: number) {
    this._fileId = value;
  }

  get authorId(): number {
    return this._authorId;
  }

  set authorId(value: number) {
    this._authorId = value;
  }

  get albumId(): number {
    return this._albumId;
  }

  set albumId(value: number) {
    this._albumId = value;
  }

  get musicGenreId(): number {
    return this._musicGenreId;
  }

  set musicGenreId(value: number) {
    this._musicGenreId = value;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }

  get productionYear(): number {
    return this._productionYear;
  }

  set productionYear(value: number) {
    this._productionYear = value;
  }

  get ownerId(): number {
    return this._ownerId;
  }

  set ownerId(value: number) {
    this._ownerId = value;
  }

  get authors(): MusicArtistsDTO[] {
    return this._authors;
  }

  set authors(value: MusicArtistsDTO[]) {
    this._authors = value;
  }

  get fileMetadata(): MusicFileMetadataDTO {
    return this._fileMetadata;
  }

  set fileMetadata(value: MusicFileMetadataDTO) {
    this._fileMetadata = value;
  }

  get genre(): MusicGenreDTO {
    return this._genre;
  }

  set genre(value: MusicGenreDTO) {
    this._genre = value;
  }

  get album(): MusicAlbumDTO {
    return this._album;
  }

  set album(value: MusicAlbumDTO) {
    this._album = value;
  }
}
