import {Component} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {MusicService} from "../../service/music-service/music.service";
import {VideoService} from "../../service/video-service/video.service";
import {ImageService} from "../../service/image-service/image.service";
import {EbookService} from "../../service/ebook-service/ebook.service";
import {SongDTO} from "../../model/music/song.dto";
import {VideoDTO} from "../../model/video/video.dto";
import {ImageDTO} from "../../model/image/image.dto";
import {EbookDTO} from "../../model/ebook/ebook.dto";

@Component({
  selector: 'app-top-list-view',
  templateUrl: './top-list-view.component.html',
  styleUrls: ['./top-list-view.component.css']
})
export class TopListViewComponent extends BaseComponent {

  public top10Songs: SongDTO[];
  public top10Videos: VideoDTO[];
  public top10Images: ImageDTO[];
  public top10Ebooks: EbookDTO[];

  constructor(private musicService: MusicService,
              private videoService: VideoService,
              private imageService: ImageService,
              private ebookService: EbookService) {
    super();
  }

  ngOnInit() {
    this.musicService.getTop10Songs(null).subscribe(value => {
      this.top10Songs = value;
    });
    this.videoService.getTop10Videos(null).subscribe(value => {
      this.top10Videos = value;
    });
    this.imageService.getTop10Images(null).subscribe(value => {
      this.top10Images = value;
    });
    this.ebookService.getTop10Ebooks(null).subscribe(value => {
      this.top10Ebooks = value;
    });
  }

}
