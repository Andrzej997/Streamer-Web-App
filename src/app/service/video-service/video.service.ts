import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AbstractService} from '../abstract-service/abstract.service';
import {Observable} from 'rxjs';
import {DirectorDTO} from "../../model/video/director.dto";
import {videoEndpoint} from "../../constants";
import {VideoSerieDTO} from "../../model/video/video.serie.dto";
import {FilmGenreDTO} from "../../model/video/film.genre.dto";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";

@Injectable()
export class VideoService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public getDirectorsPredictionList(name: string, name2: string, surname: string): Observable<DirectorDTO[]> {
    const url = `${videoEndpoint}/noauth/directors/prediction?name=${name}&name2=${name2}&surname=${surname}`;
    return this.performGet(url);
  }

  public getVideoSeriesPredictionList(serieTitle: string, videoTitle: string): Observable<VideoSerieDTO[]> {
    const url = `${videoEndpoint}/noauth/videoseries/prediction?serieTitle=${serieTitle}&videoTitle=${videoTitle}`;
    return this.performGet(url);
  }

  public getGenresPredictionList(name: string): Observable<FilmGenreDTO[]> {
    const url = `${videoEndpoint}/noauth/genres/prediction?name=${name}`;
    return this.performGet(url);
  }

  public saveVideoFileMetadata(metadata: UploadVideoMetadataDTO): Observable<UploadVideoMetadataDTO> {
    const url = `${videoEndpoint}/auth/file/metadata`;
    return this.performPost(url, JSON.stringify(metadata));
  }

}
