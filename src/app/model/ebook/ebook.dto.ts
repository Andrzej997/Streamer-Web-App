import {LiteraryGenreDTO} from "./literary.genre.dto";
import {EbookFileMetadataDTO} from "./ebook.file.metadata.dto";
import {WriterDTO} from "./writer.dto";

export class EbookDTO {

  private _ebookId: number;
  private _title: string;
  private _numOfPages: number;
  private _year: number;
  private _rating: number;
  private _genreId: number;
  private _comments: string;
  private _authorId: number;
  private _ownerId: number;
  private _ebookFileId: number;
  private _literaryGenreDTO: LiteraryGenreDTO;
  private _ebookFileMetadataDTO: EbookFileMetadataDTO;
  private _writerDTOList: WriterDTO[];

  constructor() {
    this._writerDTOList = [];
    this._ebookFileMetadataDTO = new EbookFileMetadataDTO();
    this._literaryGenreDTO = new LiteraryGenreDTO();
  }

  get ebookId(): number {
    return this._ebookId;
  }

  set ebookId(value: number) {
    this._ebookId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get numOfPages(): number {
    return this._numOfPages;
  }

  set numOfPages(value: number) {
    this._numOfPages = value;
  }

  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }

  get genreId(): number {
    return this._genreId;
  }

  set genreId(value: number) {
    this._genreId = value;
  }

  get comments(): string {
    return this._comments;
  }

  set comments(value: string) {
    this._comments = value;
  }

  get authorId(): number {
    return this._authorId;
  }

  set authorId(value: number) {
    this._authorId = value;
  }

  get ownerId(): number {
    return this._ownerId;
  }

  set ownerId(value: number) {
    this._ownerId = value;
  }

  get ebookFileId(): number {
    return this._ebookFileId;
  }

  set ebookFileId(value: number) {
    this._ebookFileId = value;
  }

  get literaryGenreDTO(): LiteraryGenreDTO {
    return this._literaryGenreDTO;
  }

  set literaryGenreDTO(value: LiteraryGenreDTO) {
    this._literaryGenreDTO = value;
  }

  get ebookFileMetadataDTO(): EbookFileMetadataDTO {
    return this._ebookFileMetadataDTO;
  }

  set ebookFileMetadataDTO(value: EbookFileMetadataDTO) {
    this._ebookFileMetadataDTO = value;
  }

  get writerDTOList(): WriterDTO[] {
    return this._writerDTOList;
  }

  set writerDTOList(value: WriterDTO[]) {
    this._writerDTOList = value;
  }
}
