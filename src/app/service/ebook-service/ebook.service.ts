import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AbstractService} from '../abstract-service/abstract.service';
import {Observable} from 'rxjs';
import {WriterDTO} from "../../model/ebook/writer.dto";
import {ebookEndpoint} from "../../constants";
import {LiteraryGenreDTO} from "../../model/ebook/literary.genre.dto";
import {UploadEbookMetadataDTO} from "../../model/ebook/upload.ebook.metadata.dto";

@Injectable()
export class EbookService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public getWritersPredictionList(name: string, name2: string, surname: string): Observable<WriterDTO[]> {
    const url = `${ebookEndpoint}/noauth/writers/prediction?name=${name}&name2=${name2}&surname=${surname}`;
    return this.performGet(url);
  }

  public getLiteraryGenresPredictionList(name: string): Observable<LiteraryGenreDTO[]> {
    const url = `${ebookEndpoint}/noauth/literarygenre/prediction?name=${name}`;
    return this.performGet(url);
  }

  public saveEbookFileMetadata(metadata: UploadEbookMetadataDTO): Observable<UploadEbookMetadataDTO> {
    const url = `${ebookEndpoint}/auth/file/metadata`;
    return this.performPost(url, JSON.stringify(metadata));
  }
}
