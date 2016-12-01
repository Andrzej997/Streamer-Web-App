import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AbstractService} from '../abstract-service/abstract.service';
import {Observable} from 'rxjs';
import {DirectorDTO} from "../../model/video/director.dto";
import {videoEndpoint} from "../../constants";
import {VideoSerieDTO} from "../../model/video/video.serie.dto";
import {FilmGenreDTO} from "../../model/video/film.genre.dto";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {VideoDTO} from "../../model/video/video.dto";
import {SearchCriteria} from "../../view-objects/search.criteria";

@Injectable()
export class VideoService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public getDirectorsPredictionList(name: string, name2?: string, surname?: string): Observable<DirectorDTO[]> {
    if (name == null || name.length <= 0) {
      name = 'undefined';
    }
    if (name2 == null || name2.length <= 0) {
      name2 = 'undefined';
    }
    if (surname == null || surname.length <= 0) {
      surname = 'undefined';
    }
    const url = `${videoEndpoint}/noauth/directors/prediction?name=${name}&name2=${name2}&surname=${surname}`;
    return this.performGet(url);
  }

  public getVideoSeriesPredictionList(serieTitle: string, videoTitle?: string): Observable<VideoSerieDTO[]> {
    if (serieTitle == null || serieTitle.length <= 0) {
      serieTitle = 'undefined';
    }
    if (videoTitle == null || videoTitle.length <= 0) {
      videoTitle = 'undefined';
    }
    const url = `${videoEndpoint}/noauth/videoseries/prediction?serieTitle=${serieTitle}&videoTitle=${videoTitle}`;
    return this.performGet(url);
  }

  public getGenresPredictionList(name: string): Observable<FilmGenreDTO[]> {
    if (name == null || name.length <= 0) {
      name = 'undefined';
    }
    const url = `${videoEndpoint}/noauth/genres/prediction?name=${name}`;
    return this.performGet(url);
  }

  public saveVideoFileMetadata(metadata: UploadVideoMetadataDTO): Observable<UploadVideoMetadataDTO> {
    const url = `${videoEndpoint}/auth/file/metadata`;
    return this.performPost(url, JSON.stringify(metadata));
  }

  public getTop10Videos(title?: string): Observable<VideoDTO[]> {
    let url = `${videoEndpoint}/noauth/top10/videos`;
    if (title != null && title.length > 0) {
      url += `?title=${title}`;
    }
    return this.performGet(url);
  }

  public getTop10VideosOnlyPrivates(title?: string): Observable<VideoDTO[]> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${videoEndpoint}/auth/top10/videos?username=${username}`;
    if (title != null && title.length > 0) {
      url += `&title=${title}`;
    }
    return this.performGet(url);
  }

  public getAllUserVideos(): Observable<VideoDTO[]> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${videoEndpoint}/auth/user/videos?username=${username}`;
    return this.performGet(url);
  }

  public searchVideosByCriteria(searchVideoCriteriaDTO: SearchCriteria): Observable<VideoDTO[]> {
    let params = JSON.stringify(searchVideoCriteriaDTO);
    let url = `${videoEndpoint}/noauth/public/videos?criteria=${params}`;
    return this.performGet(url);
  }

}
