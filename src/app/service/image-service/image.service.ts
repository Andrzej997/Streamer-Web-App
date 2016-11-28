import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AbstractService} from '../abstract-service/abstract.service';
import {Observable} from 'rxjs';
import {ArtistDTO} from "../../model/image/artist.dto";
import {imageEndpoint} from "../../constants";
import {ImageTypeDTO} from "../../model/image/image.type.dto";
import {UploadImageMetadataDTO} from "../../model/image/upload.image.metadata.dto";

@Injectable()
export class ImageService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public getArtistPredictionList(name: string, name2: string, surname: string): Observable<ArtistDTO[]> {
    const url = `${imageEndpoint}/noauth/artists/prediction?name=${name}&name2=${name2}&surname=${surname}`;
    return this.performGet(url);
  }

  public getImageTypesByPrediction(name: string): Observable<ImageTypeDTO[]> {
    const url = `${imageEndpoint}/noauth/type/prediction?name=${name}`;
    return this.performGet(url);
  }

  public saveImageFileMetadata(metadata: UploadImageMetadataDTO): Observable<UploadImageMetadataDTO> {
    const url = `${imageEndpoint}/auth/file/metadata`;
    return this.performPost(url, JSON.stringify(metadata));
  }

}
