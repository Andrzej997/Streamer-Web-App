import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AbstractService} from '../abstract-service/abstract.service';
import {Observable} from 'rxjs';
import {MusicArtistsDTO} from "../../model/music/music.artist.dto";
import {musicEndpoint} from '../../constants';
import {MusicAlbumDTO} from "../../model/music/music.album.dto";
import {MusicGenreDTO} from "../../model/music/music.genre.dto";
import {UploadSongMetadataDTO} from "../../model/music/upload.song.metadata.dto";

@Injectable()
export class MusicService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

  public getAristsPredictionList(name: string, name2?: string, surname?: string): Observable<MusicArtistsDTO[]> {
    const url = `${musicEndpoint}/noauth/authors/prediction?name=${name}&name2=${name2}&surname=${surname}`;
    return this.performGet(url);
  }

  public getAlbumsPredictionList(albumTitle: string, songTitle?: string): Observable<MusicAlbumDTO[]> {
    const url = `${musicEndpoint}/noauth/albums/prediction?albumTitle=${albumTitle}&songTitle=${songTitle}`;
    return this.performGet(url);
  }

  public getGenresPredictionList(genreName: string): Observable<MusicGenreDTO[]> {
    const url = `${musicEndpoint}/noauth/genres/prediction?genreName=${genreName}`;
    return this.performGet(url);
  }

  public saveMusicFileMetadata(metadata: UploadSongMetadataDTO): Observable<UploadSongMetadataDTO> {
    const url = `${musicEndpoint}/auth/file/metadata`;
    return this.performPost(url, JSON.stringify(metadata));
  }

}
