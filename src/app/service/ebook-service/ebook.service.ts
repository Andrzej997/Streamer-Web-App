import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {AbstractService} from "../abstract-service/abstract.service";
import {Observable} from "rxjs";
import {WriterDTO} from "../../model/ebook/writer.dto";
import {ebookEndpoint} from "../../constants";
import {LiteraryGenreDTO} from "../../model/ebook/literary.genre.dto";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";
import {EbookDTO} from "../../model/ebook/ebook.dto";
import {SearchCriteria} from "../../view-objects/search.criteria";

@Injectable()
export class EbookService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public getWritersPredictionList(name: string, name2?: string, surname?: string): Observable<WriterDTO[]> {
    if (name == null || name.length <= 0) {
      name = 'undefined';
    }
    if (name2 == null || name2.length <= 0) {
      name2 = 'undefined';
    }
    if (surname == null || surname.length <= 0) {
      surname = 'undefined';
    }
    const url = `${ebookEndpoint}/noauth/writers/prediction?name=${name}&name2=${name2}&surname=${surname}`;
    return this.performGet(url);
  }

  public getLiteraryGenresPredictionList(name: string): Observable<LiteraryGenreDTO[]> {
    if (name == null || name.length <= 0) {
      name = 'undefined';
    }
    const url = `${ebookEndpoint}/noauth/literarygenre/prediction?name=${name}`;
    return this.performGet(url);
  }

  public saveEbookFileMetadata(metadata: UploadEbookMetadataDTO): Observable<UploadEbookMetadataDTO> {
    const url = `${ebookEndpoint}/auth/file/metadata`;
    return this.performPost(url, JSON.stringify(metadata));
  }

  public getTop10Ebooks(title?: string): Observable<EbookDTO[]> {
    let url = `${ebookEndpoint}/noauth/ebooks/top10`;
    if (title != null && title.length > 0) {
      url += `?title=${title}`;
    }
    return this.performGet(url);
  }

  public getTop10EbooksOnlyPrivates(title?: string): Observable<EbookDTO[]> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${ebookEndpoint}/auth/top10/ebooks?username=${username}`;
    if (title != null && title.length > 0) {
      url += `&title=${title}`;
    }
    return this.performGet(url);
  }

  public getAllUserEbooks(): Observable<EbookDTO[]> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${ebookEndpoint}/auth/user/ebooks?username=${username}`;
    return this.performGet(url);
  }

  public searchEbooksByCriteria(searchEbookCriteriaDTO: SearchCriteria): Observable<EbookDTO[]> {
    let params = JSON.stringify(searchEbookCriteriaDTO);
    let url = `${ebookEndpoint}/noauth/public/ebooks`;
    return this.performPost(url, params);
  }

  public deleteFileAndMetadata(id: number): Observable<boolean> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${ebookEndpoint}/auth/delete/ebook?id=${id}&username=${username}`;
    return this.performDelete(url);
  }

  public updateEbookMetadata(ebook: EbookDTO): Observable<EbookDTO> {
    let url = `${ebookEndpoint}/auth/update/ebook`;
    return this.performPut(url, JSON.stringify(ebook));
  }

  public getEbooksTop50(): Observable<EbookDTO[]> {
    let url = `${ebookEndpoint}/noauth/ebook/top50`;
    return this.performGet(url);
  }

}
