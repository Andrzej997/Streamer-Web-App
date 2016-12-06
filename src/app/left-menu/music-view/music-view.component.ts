import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SongDTO} from "../../model/music/song.dto";
import {BaseComponent} from "../../base-component/base-component";
import {MetadataInfoViewComponent} from "../../main_page/metadata-info-view/metadata-info-view.component";
import {UploadSongMetadataDTO} from "../../model/music/upload.song.metadata.dto";
import {ModalDirective} from 'ng2-bootstrap';
import {MusicService} from "../../service/music-service/music.service";
import {SearchCriteria} from "../../view-objects/search.criteria";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-music-view',
  templateUrl: './music-view.component.html',
  styleUrls: ['./music-view.component.css']
})
export class MusicViewComponent extends BaseComponent {

  public songsList: SongDTO[];

  @ViewChild('metadataModal') public metadataModal: ModalDirective;

  @ViewChild(MetadataInfoViewComponent)
  private metadataInfoView: MetadataInfoViewComponent;

  public selectedItem: UploadSongMetadataDTO;

  public criteria: SearchCriteria;

  constructor(private musicService: MusicService,
              private route: ActivatedRoute) {
    super();
    this.songsList = [];
    this.selectedItem = new UploadSongMetadataDTO();
  }

  ngOnInit() {
    let criteriaParam: Observable<string> = this.route.queryParams.map(params => params['criteria'] || '');
    if (criteriaParam == null) {
      return;
    }
    criteriaParam.subscribe((value: string) => {
      if (value == null || value.length <= 0) {
        this.musicService.getSongsTop50().subscribe((value: SongDTO[]) => {
          value.forEach((item: SongDTO) => item._rate = item._rating / 10);
          this.songsList = value;
        });
        return;
      }
      let criteria: SearchCriteria = SearchCriteria.fromJSON(value);
      if (criteria == null) {
        return;
      }
      this.musicService.searchSongsByCriteria(criteria).subscribe((value: SongDTO[]) => {
        value.forEach((item: SongDTO) => item._rate = item._rating / 10);
        this.songsList = value;
      })
    });
  }

  public onPlayClick(song: SongDTO): void {

  }

  public onInfoItemClick(song: SongDTO): void {
    this.selectedItem = new UploadSongMetadataDTO();
    this.selectedItem._song = song;
    this.metadataInfoView.metadata = this.selectedItem;
    this.metadataInfoView.setCurrentItem();
    this.metadataModal.show();
  }

  public hideMetadataModal(): void {
    this.metadataModal.hide();
  }


}
