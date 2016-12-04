import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AbstractService} from '../abstract-service/abstract.service';
import {Observable} from 'rxjs';
import {MusicArtistsDTO} from "../../model/music/music.artist.dto";
import {musicEndpoint} from '../../constants';
import {MusicAlbumDTO} from "../../model/music/music.album.dto";
import {MusicGenreDTO} from "../../model/music/music.genre.dto";
import {UploadSongMetadataDTO} from "../../model/music/upload.song.metadata.dto";
import {SongDTO} from "../../model/music/song.dto";
import {SearchCriteria} from "../../view-objects/search.criteria";

@Injectable()
export class MusicService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public getAristsPredictionList(name: string, name2?: string, surname?: string): Observable<MusicArtistsDTO[]> {
    if (name == null || name.length <= 0) {
      name = 'undefined';
    }
    if (name2 == null || name2.length <= 0) {
      name2 = 'undefined';
    }
    if (surname == null || surname.length <= 0) {
      surname = 'undefined';
    }
    let url = `${musicEndpoint}/noauth/authors/prediction?name=${name}&name2=${name2}&surname=${surname}`;

    return this.performGet(url);
  }

  public getAlbumsPredictionList(albumTitle: string, songTitle?: string): Observable<MusicAlbumDTO[]> {
    if (albumTitle == null || albumTitle.length <= 0) {
      albumTitle = 'undefined';
    }
    if (songTitle == null || songTitle.length <= 0) {
      songTitle = 'undefined';
    }
    let url = `${musicEndpoint}/noauth/albums/prediction?albumTitle=${albumTitle}&songTitle=${songTitle}`;
    return this.performGet(url);
  }

  public getGenresPredictionList(genreName: string): Observable<MusicGenreDTO[]> {
    if (genreName == null || genreName.length <= 0) {
      genreName = 'undefined';
    }
    const url = `${musicEndpoint}/noauth/genres/prediction?genreName=${genreName}`;
    return this.performGet(url);
  }

  public saveMusicFileMetadata(metadata: UploadSongMetadataDTO): Observable<UploadSongMetadataDTO> {
    const url = `${musicEndpoint}/auth/file/metadata`;
    return this.performPost(url, JSON.stringify(metadata));
  }

  public streamMusicFile(fileId: number): Observable<string> {
    const url = `${musicEndpoint}/noauth/download?id=${fileId}`;
    return this.performGet(url);
  }

  public getTop10Songs(title?: string): Observable<SongDTO[]> {
    let url = `${musicEndpoint}/noauth/top10/songs`;
    if (title != null && title.length > 0) {
      url += `?title=${title}`;
    }
    return <Observable<SongDTO[]>>this.performGet(url);
  }

  public getTop10SongsOnlyPrivates(title?: string): Observable<SongDTO[]> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${musicEndpoint}/auth/top10/songs?username=${username}`;
    if (title != null && title.length > 0) {
      url += `&title=${title}`;
    }
    return this.performGet(url);
  }

  public getAllUserSongs(): Observable<SongDTO[]> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${musicEndpoint}/auth/user/songs?username=${username}`;
    return this.performGet(url);
  }

  public searchSongsByCriteria(searchSongCriteriaDTO: SearchCriteria): Observable<SongDTO[]> {
    let params = JSON.stringify(searchSongCriteriaDTO);
    let url = `${musicEndpoint}/noauth/public/songs?criteria=${params}`;
    return this.performGet(url);
  }

  public deleteFileAndMetadata(id: number): Observable<boolean> {
    let username = localStorage.getItem('username');
    if (username == null) {
      return null;
    }
    let url = `${musicEndpoint}/auth/delete/song?id=${id}&username=${username}`;
    return this.performDelete(url);
  }

  public updateSongMetadata(song: SongDTO): Observable<SongDTO> {
    let url = `${musicEndpoint}/auth/update/song`;
    return this.performPut(url, JSON.stringify(song));
  }

  public getSongsTop50(): Observable<SongDTO[]> {
    let url = `${musicEndpoint}/noauth/song/top50`;
    return this.performGet(url);
  }

}
