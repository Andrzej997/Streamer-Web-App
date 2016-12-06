import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from "../../base-component/base-component";
import {VideoDTO} from "../../model/video/video.dto";
import {MetadataInfoViewComponent} from "../../main_page/metadata-info-view/metadata-info-view.component";
import {UploadVideoMetadataDTO} from "../../model/video/upload.video.metadata.dto";
import {ModalDirective} from 'ng2-bootstrap';
import {VideoService} from "../../service/video-service/video.service";
import {Observable} from 'rxjs';
import {SearchCriteria} from "../../view-objects/search.criteria";

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

  constructor(private videoService: VideoService,
              private route: ActivatedRoute) {
    super();
    this.videoList = [];
    this.selectedItem = new UploadVideoMetadataDTO();
  }

  public ngOnInit() {
    let criteriaParam: Observable<string> = this.route.queryParams.map(params => params['criteria'] || '');
    if (criteriaParam == null) {
      return;
    }
    criteriaParam.subscribe((value: string) => {
      if (value == null || value.length <= 0) {
        this.videoService.getVideosTop50().subscribe((value: VideoDTO[]) => {
          value.forEach((item: VideoDTO) => item._rate = item._rating / 10);
          this.videoList = value;
        });
        return;
      }
      let criteria: SearchCriteria = SearchCriteria.fromJSON(value);
      if (criteria == null) {
        return;
      }
      this.videoService.searchVideosByCriteria(criteria).subscribe((value: VideoDTO[]) => {
        value.forEach((item: VideoDTO) => item._rate = item._rating / 10);
        this.videoList = value;
      })
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
