import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AbstractService} from '../abstract-service/abstract.service';
import {Observable} from 'rxjs';
import {ArtistDTO} from "../../model/image/artist.dto";
import {imageEndpoint} from "../../constants";
import {ImageTypeDTO} from "../../model/image/image.type.dto";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";
import {ImageDTO} from "../../model/image/image.dto";
import {SearchCriteria} from "../../view-objects/search.criteria";

@Injectable()
export class ImageService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public getArtistPredictionList(name: string, name2?: string, surname?: string): Observable<ArtistDTO[]> {
    if (name == null || name.length <= 0) {
      name = 'undefined';
    }
    if (name2 == null || name2.length <= 0) {
      name2 = 'undefined';
    }
    if (surname == null || surname.length <= 0) {
      surname = 'undefined';
    }
    const url = `${imageEndpoint}/noauth/artists/prediction?name=${name}&name2=${name2}&surname=${surname}`;
    return this.performGet(url);
  }

  public getImageTypesByPrediction(name: string): Observable<ImageTypeDTO[]> {
    if (name == null || name.length <= 0) {
      name = 'undefined';
    }
    const url = `${imageEndpoint}/noauth/type/prediction?name=${name}`;
    return this.performGet(url);
  }

  public saveImageFileMetadata(metadata: UploadImageMetadataDTO): Observable<UploadImageMetadataDTO> {
    const url = `${imageEndpoint}/auth/file/metadata`;
    return this.performPost(url, JSON.stringify(metadata));
  }

  public getTop10Images(title?: string): Observable<ImageDTO[]> {
    let url = `${imageEndpoint}/noauth/top10/images`;
    if (title != null && title.length > 0) {
      url += `?title=${title}`;
    }
    return this.performGet(url);
  }

  public getTop10ImagesOnlyPrivates(title?: string): Observable<ImageDTO[]> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${imageEndpoint}/auth/top10/images?username=${username}`;
    if (title != null && title.length > 0) {
      url += `&title=${title}`;
    }
    return this.performGet(url);
  }

  public getAllUserImages(): Observable<ImageDTO[]> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${imageEndpoint}/auth/user/images?username=${username}`;
    return this.performGet(url);
  }

  public searchImagesByCriteria(searchImageCriteriaDTO: SearchCriteria): Observable<ImageDTO[]> {
    let params = JSON.stringify(searchImageCriteriaDTO);
    let url = `${imageEndpoint}/noauth/public/images?criteria=${params}`;
    return this.performGet(url);
  }

}
