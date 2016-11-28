import {Component, Input} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";
import {MusicService} from "../../service/music-service/music.service";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent extends BaseComponent {

  @Input() fileId: number;
  @Input() source: string;

  constructor(private musicService: MusicService) {
    super();
  }

  ngOnInit() {
  }

}
