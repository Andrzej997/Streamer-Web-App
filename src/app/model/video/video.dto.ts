import {DirectorDTO} from "./director.dto";
import {VideoFileMetadataDTO} from "./video.file.metadata.dto";
import {FilmGenreDTO} from "./film.genre.dto";
import {VideoSerieDTO} from "./video.serie.dto";
import {MediaItem} from "../abstract/media.item";

export class VideoDTO implements MediaItem {

  public _videoId: number;
  public _videoFileId: number;
  public _title: string;
  public _ratingTimes: number;
  public _filmGenreId: number;
  public _videoSerieId: number;
  public _rating: number;
  public _productionYear: number;
  public _ownerId: number;
  public _directorList: DirectorDTO[];
  public _videoFileMetadata: VideoFileMetadataDTO;
  public _filmGenre: FilmGenreDTO;
  public _videoSerie: VideoSerieDTO;

  public _rate: number;

  constructor() {
    this._directorList = [];
    this._videoFileMetadata = new VideoFileMetadataDTO();
    this._filmGenre = new FilmGenreDTO();
    this._videoSerie = new VideoSerieDTO();
  }

  public getOwnerId(): number {
    return this._ownerId;
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

  get ratingTimes(): number {
    return this._ratingTimes;
  }

  set ratingTimes(value: number) {
    this._ratingTimes = value;
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
