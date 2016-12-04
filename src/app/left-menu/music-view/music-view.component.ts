import {Component, ViewChild} from '@angular/core';
import {SongDTO} from "../../model/music/song.dto";
import {BaseComponent} from "../../base-component/base-component";
import {MetadataInfoViewComponent} from "../../main_page/metadata-info-view/metadata-info-view.component";
import {UploadSongMetadataDTO} from "../../model/music/upload.song.metadata.dto";
import {ModalDirective} from 'ng2-bootstrap';
import {MusicService} from "../../service/music-service/music.service";

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

  constructor(private musicService: MusicService) {
    super();
    this.songsList = [];
    this.selectedItem = new UploadSongMetadataDTO();
  }

  ngOnInit() {
    this.musicService.getSongsTop50().subscribe((value: SongDTO[]) => {
      this.songsList = value;
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
