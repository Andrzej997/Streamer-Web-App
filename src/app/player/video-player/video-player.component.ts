import {Component, ViewChild, ElementRef, SimpleChanges} from '@angular/core';
import {VideoDTO} from '../../model/video/video.dto';
import {BaseComponent} from '../../base-component/base-component';
import {VideoService} from '../../service/video-service/video.service';
import {videoStreamEndpoint, videoStreamAuthEndpoint} from '../../constants';
import {RateVideoDTO} from '../../model/video/rate.video.dto';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent extends BaseComponent {

  public playedVideo: VideoDTO;
  public visible: boolean = false;
  public source: string = '';

  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 1.0;

  @ViewChild('videoTag')
  private videoPlayerElement: ElementRef;
  @ViewChild('videoSrc')
  private videoSourceElement: ElementRef;

  private videoPlayer: HTMLVideoElement;
  private videoSource: HTMLSourceElement;

  private max: number;
  private value: number;

  public authContext: boolean = false;

  private type: string;
  private displayedText: string = '';
  private displayedTime: string = '';
  private rate: number = 0;

  constructor(private videoService: VideoService) {
    super();
    this.playedVideo = new VideoDTO();
  }

  public ngOnInit() {
    document.addEventListener('fullscreenchange', () => {
      this.setFullScreenData(!!(document['fullScreen '] || document.fullscreenElement));
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.setFullScreenData(document.webkitIsFullScreen);
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.setFullScreenData(!!document['mozFullScreen']);
    });
    document.addEventListener('msfullscreenchange', () => {
      this.setFullScreenData(!!document['msFullscreenElement']);
    });
  }

  public ngAfterViewInit(): void {
    this.videoPlayer = this.videoPlayerElement.nativeElement;
    this.videoSource = this.videoSourceElement.nativeElement;
    this.videoPlayer.controls = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  private initPlayer(): void {
    if (this.authContext) {
      let username: string = localStorage.getItem('username');
      let authToken: string = localStorage.getItem(environment.tokenName);
      this.source = videoStreamAuthEndpoint
        + '?username=' + username + '&id=' + this.playedVideo._videoFileId + '&authToken=' + authToken;
    } else {
      this.source = videoStreamEndpoint + '?id=' + this.playedVideo._videoFileId;
    }
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        this.hide();
      }
    });
    this.videoSource.src = this.source;
    this.videoSource.type = this.type;
    this.type = 'video/' + this.playedVideo._videoFileMetadata._extension;
    this.videoPlayer.src = this.source;
    this.enterFullScreen();
    this.videoPlayer.load();
    this.createDisplayedText();
    this.rate = 0;
  }

  setFullScreenData(state): void {
    this.videoPlayer.parentElement.setAttribute('data-fullscreen', !!state ? 'true' : 'false');
  }

  public isFullScreen() {
    return !!(document['fullScreen'] || document.webkitIsFullScreen || document['mozFullScreen'] || document['msFullscreenElement']
      || document['fullscreenElement']);
  }

  public enterFullScreen(): void {
    if (this.isFullScreen()) {
      return;
    }
    let elem =  document.body;
    let methodToBeInvoked = elem.requestFullscreen || elem.webkitRequestFullScreen
      || elem['mozRequestFullscreen'] || elem['msRequestFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(elem);
      this.setFullScreenData(true);
    }
  }

  public exitFullScreen(): void {
    if (!this.isFullScreen()) {
      return;
    }
    let methodToBeInvoked = document['exitFullscreen'] || document['webkitCancelFullScreen']
      || document['mozCancelFullScreen'] || document['msExitFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(document);
      this.setFullScreenData(false);
    }
  }

  public play(): void {
    if (this.videoPlayer.paused) {
      this.videoPlayer.play();
      this.isPlaying = true;
    } else {
      this.videoPlayer.pause();
      this.isPlaying = false;
    }
  }

  public stop(): void {
    this.videoPlayer.pause();
    this.videoPlayer.currentTime = 0;
    this.isPlaying = false;
  }

  public onVolumeChange(event: Event): void {
    this.videoPlayer.volume = (<HTMLInputElement>event.target).valueAsNumber;
    this.volume = this.videoPlayer.volume;
    this.isMuted = this.volume <= 0;
  }

  public mute(): void {
    this.isMuted = true;
    this.volume = 0.0;
    this.videoPlayer.volume = 0.0;
  }

  public fullVolume(): void {
    this.isMuted = false;
    this.volume = 1.0;
    this.videoPlayer.volume = 1.0;
  }

  public ngOnDestroy(): void {
  }

  public show(video: VideoDTO): void {
    this.saveRating();
    this.playedVideo = video;
    this.visible = true;
    this.initPlayer();
    this.play();
  }

  public hide(): void {
    this.stop();
    this.visible = false;
  }

  public createDisplayedText(): void {
    let resultText: string;
    if (this.playedVideo == null) {
      return;
    }
    for (let director of this.playedVideo._directorList) {
      resultText = director._name + ' ' + director._surname;
      resultText += ', ';
    }
    if (resultText.length > 2) {
      resultText = resultText.substring(0, resultText.length - 2);
    }
    resultText += ' ' + this.playedVideo._title;
    this.displayedText = resultText;
  }

  public updateDisplayTime(): void {
    let time: number = this.videoPlayer.currentTime;
    this.displayedTime = this.createTimeString(time) + '/' + this.createTimeString(this.max);
    if (isNaN(this.max) || this.max === Infinity) { this.max = this.videoPlayer.duration; }
    this.value = this.videoPlayer.currentTime;
  }

  public createTimeString(time: number): string {
    let result: string;
    if (isNaN(time)) {
      return '00:00';
    }
    let hour = parseInt((time / 3600).toString(), 10);
    time = time % 3600;
    let min = parseInt((time / 60).toString(), 10);
    time = time % 60;
    let sec = parseInt(time.toString(), 10);
    if (hour > 0) {
      result = this.createTimeNumberString(hour) + ':';
      result += this.createTimeNumberString(min) + ':';
      result += this.createTimeNumberString(sec);
    } else {
      result = this.createTimeNumberString(min) + ':';
      result += this.createTimeNumberString(sec);
    }
    return result;
  }

  public createTimeNumberString(num: number): string {
    if (isNaN(num)) {
      return '00';
    }
    if (num < 10) {
      return '0' + num.toString();
    } else {
      return num.toString();
    }
  }

  public onExit(): void {
    this.exitFullScreen();
    this.saveRating();
    this.hide();
  }

  public saveRating(): void {
    if (this.rate > 0) {
      let rateVideoDTO: RateVideoDTO = new RateVideoDTO();
      rateVideoDTO._rate = this.rate;
      rateVideoDTO._filmId = this.playedVideo._videoId;
      this.videoService.rateVideo(rateVideoDTO).subscribe();
      this.rate = 0;
    }
  }

  public setAuthContext(value: boolean): void {
    this.authContext = value;
  }

  onProgressChange(event: Event): void {
    let input = (<HTMLInputElement>event.target);
    let sth = this.videoPlayer.seekable;
    if (sth.length > 0) {
      this.videoPlayer.currentTime = input.valueAsNumber;
    }
  }

  onVideoMetadataLoaded(): void {
    this.max = this.videoPlayer.duration;
  }

  onVideoEnded(): void {
    this.videoPlayer.currentTime = 0;
    this.isPlaying = false;
  }

}
