import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {VideoDTO} from "../../model/video/video.dto";
import {MetadataInfoViewComponent} from "../../main_page/metadata-info-view/metadata-info-view.component";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {ModalDirective} from 'ng2-bootstrap';
import {VideoService} from "../../service/video-service/video.service";

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent extends BaseComponent {

  public videoList: VideoDTO[];

  @ViewChild('metadataModal') public metadataModal: ModalDirective;

  @ViewChild(MetadataInfoViewComponent)
  private metadataInfoView: MetadataInfoViewComponent;

  public selectedItem: UploadVideoMetadataDTO;

  constructor(private videoService: VideoService) {
    super();
    this.videoList = [];
    this.selectedItem = new UploadVideoMetadataDTO();
  }

  public ngOnInit() {
    this.videoService.getVideosTop50().subscribe((value: VideoDTO[]) => {
      this.videoList = value;
    });
  }

  public onPlayClick(video: VideoDTO): void {

  }

  public onInfoItemClick(video: VideoDTO): void {
    this.selectedItem = new UploadVideoMetadataDTO();
    this.selectedItem._video = video;
    this.metadataInfoView.metadata = this.selectedItem;
    this.metadataInfoView.setCurrentItem();
    this.metadataModal.show();
  }

  public hideMetadataModal(): void {
    this.metadataModal.hide();
  }


}
