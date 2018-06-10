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
  @ViewChild('screenShot')
  private canvasElement: ElementRef;

  private videoPlayer: HTMLVideoElement;
  private videoSource: HTMLSourceElement;
  private canvas: HTMLCanvasElement;

  private max: number;
  private value: number;

  public authContext: boolean = false;

  private type: string;
  private displayedText: string = '';
  private displayedTime: string = '';
  private rate: number = 0;

  private qualityOptions: QualityType[] = [
    {key: 'H240', value: '240p', videoFileId: undefined, sortOrder: 1},
    {key: 'H480', value: '480p', videoFileId: undefined, sortOrder: 2},
    {key: 'H720', value: '720p', videoFileId: undefined, sortOrder: 3},
    {key: 'H1080', value: '1080p', videoFileId: undefined, sortOrder: 4}
  ];
  private videoCurrentTime: number = undefined;
  public currentQualities: QualityType[] = this.qualityOptions;
  public quality: QualityType = this.qualityOptions[0];

  private canvasHeight: number;
  private canvasWidth: number;

  private isLoading: boolean = false;

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
    this.canvasHeight = window.screen.availHeight - 69;
    this.canvasWidth = window.screen.availWidth;
  }

  public ngAfterViewInit(): void {
    this.videoPlayer = this.videoPlayerElement.nativeElement;
    this.videoSource = this.videoSourceElement.nativeElement;
    this.canvas = this.canvasElement.nativeElement;
    this.videoPlayer.controls = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  private initPlayer(fileId: number = undefined): void {
    const id = fileId !== undefined ? fileId : !!this.playedVideo ? this.playedVideo._videoFileId : undefined;
    if (this.authContext) {
      let username: string = localStorage.getItem('username');
      let authToken: string = localStorage.getItem(environment.tokenName);
      this.source = videoStreamAuthEndpoint
        + '?username=' + username
        + '&id=' + id
        + '&authToken=' + authToken;
    } else {
      this.source = videoStreamEndpoint
        + '?id=' + id;
    }
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        this.hide();
      }
    });
    this.prepareAvailableQualities();
    this.videoSource.src = this.source;
    this.videoSource.type = this.type;
    this.type = 'video/' + this.playedVideo._videoFileMetadata._extension;
    this.videoPlayer.src = this.source;
    this.enterFullScreen();
    this.videoPlayer.load();
    this.createDisplayedText();
    this.rate = 0;
  }

  public onQualityChange(): void {
    this.videoPlayer.pause();
    this.videoCurrentTime = this.videoPlayer.currentTime;
    this.isPlaying = false;
    this.isLoading = true;
    this.takeSnapshot();
    this.initPlayer(this.quality.videoFileId);
  }

  public findMatchingQualityType(key: string, id: number): QualityType {
    const result = this.qualityOptions.find((value => value.key === key));
    result.videoFileId = id;
    return result;
  }

  public prepareAvailableQualities(): void {
    if (this.playedVideo == null) {
      return;
    }
    const qualities: QualityType[] = [];
    qualities.push(this.findMatchingQualityType(this.playedVideo._videoFileMetadata._resolution, this.playedVideo._videoFileMetadata._videoFileId));
    if (this.playedVideo._videoFileMetadata._qualities != null && this.playedVideo._videoFileMetadata._qualities.length > 0) {
      this.playedVideo._videoFileMetadata._qualities.forEach((item) => {
        qualities.push(this.findMatchingQualityType(item._resolution, item._videoFileId));
      });
    }
    qualities.sort((a, b) => a.sortOrder < b.sortOrder ? 1 : a.sortOrder > b.sortOrder ? -1 : 0);
    this.currentQualities = qualities;
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
    this.quality = this.findMatchingQualityType(this.playedVideo._videoFileMetadata._resolution, this.playedVideo._videoFileMetadata._videoFileId);
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

  onVideoCanPlay(): void {
    if (this.videoCurrentTime !== undefined) {
      this.videoPlayer.currentTime = this.videoCurrentTime;
      this.videoCurrentTime = undefined;
      this.play();
      this.isLoading = false;
    }
  }

  takeSnapshot() {
    const context = this.canvas.getContext('2d');
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    context.drawImage(this.videoPlayer, 0, 0, this.canvas.width, this.canvas.height);
  }

  onVideoEnded(): void {
    this.videoPlayer.currentTime = 0;
    this.isPlaying = false;
  }

}

interface QualityType {
  key: string;
  value: string;
  videoFileId: number;
  sortOrder: number;
}
