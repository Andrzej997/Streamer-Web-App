import {Component, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {AudioPlayerComponent} from '../../player/audio-player/audio-player.component';

@Component({
  selector: 'app-radio-view',
  templateUrl: './radio-view.component.html',
  styleUrls: ['./radio-view.component.css']
})
export class RadioViewComponent extends BaseComponent {

  @ViewChild('radioPlayer')
  private audioPlayer: AudioPlayerComponent;

  public radioUrl: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public playRadio(): void {
    this.audioPlayer.playRadio(this.radioUrl);
  }

}
