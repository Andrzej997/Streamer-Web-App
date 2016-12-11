import {Component, ElementRef, SimpleChanges, ViewChild} from "@angular/core";
import {SongDTO} from "../../model/music/song.dto";
import {BaseComponent} from "../../base-component/base-component";
import {musicStreamEndpoint, musicStreamAuthEndpoint} from "../../constants";
import {MusicService} from "../../service/music-service/music.service";
import {RateSongDTO} from "../../model/music/rate.song.dto";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent extends BaseComponent {

  public playedSong: SongDTO;
  public visible: boolean = false;
  public source: string = '';

  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 1.0;

  @ViewChild('audioTag')
  private musicPlayerElement: ElementRef;
  @ViewChild('audioSrc')
  private audioSourceElement: ElementRef;

  private musicPlayer: HTMLAudioElement;
  private audioSource: HTMLSourceElement;

  public authContext: boolean = false;

  private type: string;
  private displayedText: string = '';
  private displayedTime: string = '';
  private rate: number = 0;

  constructor(private musicService: MusicService) {
    super();
    this.playedSong = new SongDTO();
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.musicPlayer = this.musicPlayerElement.nativeElement;
    this.audioSource = this.audioSourceElement.nativeElement;
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  private initPlayer(): void {
    if (this.authContext) {
      let username: string = localStorage.getItem('username');
      let authToken: string = localStorage.getItem('id_token');
      this.source = musicStreamAuthEndpoint
        + "?username=" + username + "&id=" + this.playedSong._fileId + "&authToken=" + authToken;
    } else {
      this.source = musicStreamEndpoint + "?id=" + this.playedSong._fileId;
    }
    this.audioSource.src = this.source;
    this.audioSource.type = this.type;
    this.type = "audio/" + this.playedSong._fileMetadata._extension;
    this.musicPlayer.src = this.source;
    this.musicPlayer.load();
    this.createDisplayedText();
    this.rate = 0;
  }

  public play(): void {
    if (this.musicPlayer.paused) {
      this.musicPlayer.play();
      this.isPlaying = true;
    } else {
      this.musicPlayer.pause();
      this.isPlaying = false;
    }
  }

  public stop(): void {
    this.musicPlayer.pause();
    this.musicPlayer.currentTime = 0;
    this.isPlaying = false;
  }

  public onVolumeChange(event: Event): void {
    this.musicPlayer.volume = (<HTMLInputElement>event.target).valueAsNumber;
    this.volume = this.musicPlayer.volume;
    if (this.volume > 0) {
      this.isMuted = false;
    } else {
      this.isMuted = true;
    }
  }

  public mute(): void {
    this.isMuted = true;
    this.volume = 0.0;
    this.musicPlayer.volume = 0.0;
  }

  public fullVolume(): void {
    this.isMuted = false;
    this.volume = 1.0;
    this.musicPlayer.volume = 1.0;
  }

  public ngOnDestroy(): void {
  }

  public show(song: SongDTO): void {
    this.saveRating();
    this.playedSong = song;
    this.visible = true;
    this.initPlayer();
    this.play();
  }

  public hide(): void {
    this.stop();
    this.visible = false;
  }

  public createDisplayedText(): void {
    let resultText: string = '';
    if (this.playedSong == null) {
      return;
    }
    for (let author of this.playedSong._authors) {
      resultText = author._name + " " + author._surname;
      resultText += ", ";
    }
    if (resultText.length > 2) {
      resultText = resultText.substring(0, resultText.length - 2);
    }
    resultText += " " + this.playedSong._title;
    this.displayedText = resultText;
  }

  public updateDisplayTime(): void {
    let time: number = this.musicPlayer.currentTime;
    this.displayedTime = this.createTimeString(time);
  }

  public createTimeString(time: number): string {
    let result: string;
    if (isNaN(time)) {
      return "00:00";
    }
    let hour = parseInt((time / 3600).toString());
    time = time % 3600;
    let min = parseInt((time / 60).toString());
    time = time % 60;
    let sec = parseInt(time.toString());
    if (hour > 0) {
      result = this.createTimeNumberString(hour) + ":";
      result += this.createTimeNumberString(min) + ":";
      result += this.createTimeNumberString(sec);
    } else {
      result = this.createTimeNumberString(min) + ":";
      result += this.createTimeNumberString(sec);
    }
    return result;
  }

  public createTimeNumberString(num: number): string {
    if (isNaN(num)) {
      return "00";
    }
    if (num < 10) {
      return "0" + num.toString();
    } else {
      return num.toString();
    }
  }

  public onExit(): void {
    this.saveRating();
    this.hide();
  }

  public saveRating(): void {
    if (this.rate > 0) {
      let rateSongDTO: RateSongDTO = new RateSongDTO();
      rateSongDTO._rate = this.rate;
      rateSongDTO._songId = this.playedSong._songId;
      this.musicService.rateSong(rateSongDTO).subscribe();
      this.rate = 0;
    }
  }

  public setAuthContext(value: boolean): void {
    this.authContext = value;
  }

}
