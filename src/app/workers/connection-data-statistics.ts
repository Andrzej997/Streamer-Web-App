import {ConnectionSpeedData} from './connection-speed-data';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

export class ConnectionDataStatistics {

  private static _instance: ConnectionDataStatistics;
  public statisticsFinished: boolean;

  public connectionDataList: ConnectionSpeedData[];

  private constructor() {
    this.connectionDataList = [];
  }

  public static get Instance(): ConnectionDataStatistics {
    return this._instance || (this._instance = new this());
  }

  public initStatistics(): Observable<boolean> {
    this.statisticsFinished = false;
    let longUid: any;
    let shortUid: any;
    return new Observable<boolean>((subscriber => {
      let sFunc = () => {
        shortUid = setTimeout(() => {
          if (this.statisticsFinished) {
            if (longUid !== undefined && !isNaN(longUid)) {
              clearTimeout(longUid);
            }
            console.log('statisticsFinished');
            subscriber.next(true);
            subscriber.complete();
            shortUid = NaN;
            return;
          }
          sFunc();
        }, 250);
      };
      sFunc();
      longUid = setTimeout(() => {
        console.log('statisticsFinishedFalse');
        subscriber.next(false);
        subscriber.complete();
        if (shortUid !== undefined && !isNaN(shortUid)) {
          clearTimeout(shortUid);
        }
      }, 100000);
    }));
  }

  public addConnectionData(data: ConnectionSpeedData): void {
    if (data === undefined) {
      return;
    }
    if (this.connectionDataList === null) {
      this.connectionDataList = [];
    }
    if (this.connectionDataList.length >= 10) {
      this.connectionDataList.shift();
      this.connectionDataList.push(data);
    } else {
      this.connectionDataList.push(data);
    }
  }

  public endStatistics(): void {
    this.statisticsFinished = true;
  }

  public getConnectionStatistics(): ConnectionStatistics {
    if (this.connectionDataList === null || this.connectionDataList.length <= 0) {
      return null;
    }
    let meanSpeedBps = 0;
    this.connectionDataList.forEach((item) => {
      meanSpeedBps += item.speedBps;
    });
    meanSpeedBps = meanSpeedBps / this.connectionDataList.length;
    return {
      speedBps: meanSpeedBps,
      speedKbps: meanSpeedBps / 1024,
      speedMbps: meanSpeedBps / (1024 * 1024)
    };
  }

  public getProposedQuality(currentQuality: string): string {
    if (this.connectionDataList === null || this.connectionDataList.length <= 0) {
      return null;
    }
    const statistics = this.connectionDataList.slice(Math.max(this.connectionDataList.length - 3, 1));
    let meanSpeedBps = 0;
    statistics.forEach((item) => {
      meanSpeedBps += item.speedBps;
    });
    meanSpeedBps = meanSpeedBps / this.connectionDataList.length;
    return this.getProposedQualityInternal(meanSpeedBps / (1024), currentQuality);
  }

  private getProposedQualityInternal(currentSpeedKBps: number, currentQuality: string): string {
    console.log('Measured speed in KBps: ' + currentSpeedKBps);
    let result = 'H240';
    if (currentSpeedKBps < 128) {
      result =  'H240';
    }
    if (currentSpeedKBps >= 128 && currentSpeedKBps <= 256) {
      if (currentQuality === 'H240' || currentQuality === 'H480') {
        return currentQuality;
      } else {
        return 'H240';
      }
    }
    if (currentSpeedKBps > 256 && currentSpeedKBps < 428) {
      result = 'H480';
    }
    if (currentSpeedKBps >= 428 && currentSpeedKBps <= 768) {
      if (currentQuality === 'H480' || currentQuality === 'H720') {
        return currentQuality;
      } else {
        return 'H480';
      }
    }
    if (currentSpeedKBps > 768 && currentSpeedKBps < 1024) {
      result = 'H720';
    }
    if (currentSpeedKBps >= 1024 && currentSpeedKBps <= 1536) {
      if (currentQuality === 'H720' || currentQuality === 'H1080') {
        return currentQuality;
      } else {
        return 'H720';
      }
    }
    if (currentSpeedKBps > 1536) {
      result = 'H1080';
    }
    console.log('Proposed quality ' + result + ' Current Speed ' + currentSpeedKBps.toFixed());
    return result;
  }

}

export interface ConnectionStatistics {
  speedBps?: number;
  speedKbps?: number;
  speedMbps?: number;
}

