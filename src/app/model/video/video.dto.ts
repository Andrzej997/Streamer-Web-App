import {DirectorDTO} from "./director.dto";
import {VideoFileMetadataDTO} from "./video.file.metadata.dto";
import {FilmGenreDTO} from "./film.genre.dto";
import {VideoSerieDTO} from "./video.serie.dto";

export class VideoDTO {

  private _videoId: number;
  private _videoFileId: number;
  private _title: string;
  private _directorId: number;
  private _filmGenreId: number;
  private _videoSerieId: number;
  private _rating: number;
  private _productionYear: number;
  private _ownerId: number;
  private _directorList: DirectorDTO[];
  private _videoFileMetadata: VideoFileMetadataDTO;
  private _filmGenre: FilmGenreDTO;
  private _videoSerie: VideoSerieDTO;

  constructor() {
    this._directorList = [];
    this._videoFileMetadata = new VideoFileMetadataDTO();
    this._filmGenre = new FilmGenreDTO();
    this._videoSerie = new VideoSerieDTO();
  }

  get videoId(): number {
    return this._videoId;
  }

  set videoId(value: number) {
    this._videoId = value;
  }

  get videoFileId(): number {
    return this._videoFileId;
  }

  set videoFileId(value: number) {
    this._videoFileId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get directorId(): number {
    return this._directorId;
  }

  set directorId(value: number) {
    this._directorId = value;
  }

  get filmGenreId(): number {
    return this._filmGenreId;
  }

  set filmGenreId(value: number) {
    this._filmGenreId = value;
  }

  get videoSerieId(): number {
    return this._videoSerieId;
  }

  set videoSerieId(value: number) {
    this._videoSerieId = value;
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

  get directorList(): DirectorDTO[] {
    return this._directorList;
  }

  set directorList(value: DirectorDTO[]) {
    this._directorList = value;
  }

  get videoFileMetadata(): VideoFileMetadataDTO {
    return this._videoFileMetadata;
  }

  set videoFileMetadata(value: VideoFileMetadataDTO) {
    this._videoFileMetadata = value;
  }

  get filmGenre(): FilmGenreDTO {
    return this._filmGenre;
  }

  set filmGenre(value: FilmGenreDTO) {
    this._filmGenre = value;
  }

  get videoSerie(): VideoSerieDTO {
    return this._videoSerie;
  }

  set videoSerie(value: VideoSerieDTO) {
    this._videoSerie = value;
  }
}
