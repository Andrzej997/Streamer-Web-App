import {ArtistDTO} from "./artist.dto";
import {ImageFileDTO} from "./image.file.dto";
import {ImageTypeDTO} from "./image.type.dto";

export class ImageDTO {

  public _imageId: number;
  public _title: string;
  public _imageFileId: number;
  public _nativeWidth: number;
  public _nativeHeight: number;
  public _resolution: number;
  public _depth: number;
  public _comments: number;
  public _rating: number;
  public _typeId: number;
  public _year: number;
  public _ownerId: number;
  public _ratingTimes: number;
  public _artistDTOList: ArtistDTO[];
  public _imageFileDTO: ImageFileDTO;
  public _imageTypeDTO: ImageTypeDTO;

  constructor() {
    this._artistDTOList = [];
    this._imageFileDTO = new ImageFileDTO();
    this._imageTypeDTO = new ImageTypeDTO();
  }


  get imageId(): number {
    return this._imageId;
  }

  set imageId(value: number) {
    this._imageId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get imageFileId(): number {
    return this._imageFileId;
  }

  set imageFileId(value: number) {
    this._imageFileId = value;
  }

  get nativeWidth(): number {
    return this._nativeWidth;
  }

  set nativeWidth(value: number) {
    this._nativeWidth = value;
  }

  get nativeHeight(): number {
    return this._nativeHeight;
  }

  set nativeHeight(value: number) {
    this._nativeHeight = value;
  }

  get resolution(): number {
    return this._resolution;
  }

  set resolution(value: number) {
    this._resolution = value;
  }

  get depth(): number {
    return this._depth;
  }

  set depth(value: number) {
    this._depth = value;
  }

  get comments(): number {
    return this._comments;
  }

  set comments(value: number) {
    this._comments = value;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }

  get typeId(): number {
    return this._typeId;
  }

  set typeId(value: number) {
    this._typeId = value;
  }

  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  get ownerId(): number {
    return this._ownerId;
  }

  set ownerId(value: number) {
    this._ownerId = value;
  }

  get ratingTimes(): number {
    return this._ratingTimes;
  }

  set ratingTimes(value: number) {
    this._ratingTimes = value;
  }

  get artistDTOList(): ArtistDTO[] {
    return this._artistDTOList;
  }

  set artistDTOList(value: ArtistDTO[]) {
    this._artistDTOList = value;
  }

  get imageFileDTO(): ImageFileDTO {
    return this._imageFileDTO;
  }

  set imageFileDTO(value: ImageFileDTO) {
    this._imageFileDTO = value;
  }

  get imageTypeDTO(): ImageTypeDTO {
    return this._imageTypeDTO;
  }

  set imageTypeDTO(value: ImageTypeDTO) {
    this._imageTypeDTO = value;
  }
}
