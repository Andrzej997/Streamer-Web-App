import * as workerPath from 'file-loader?name=[name].js!./speed-detection-worker';
import {ConnectionSpeedData} from './connection-speed-data';
import {ConnectionDataStatistics} from './connection-data-statistics';
import {Observable} from 'rxjs/Observable';

export class ConnectionWorkerFactory {

  private worker: Worker;

  constructor() {
  }

  public doWork(): Observable<boolean> {
    if (this.worker != null && this.isWorking()) {
      console.log('Worker is working');
      return Observable.of(false);
    }
    console.log('starting worker');
    const result =  ConnectionDataStatistics.Instance.initStatistics();
    this.worker = new Worker(workerPath);
    this.worker.onmessage = this.handleMessage;
    this.worker.postMessage('GatherStatistics');
    return result;
  }

  public isWorking(): boolean {
    return !ConnectionDataStatistics.Instance.statisticsFinished;
  }

  private handleMessage( this: Worker, message: MessageEvent ) {

    switch ( message.data ) {
      case 'Done':
        ConnectionDataStatistics.Instance.endStatistics();
        this.terminate();
        console.log('worker finished');
        break;
      default:
        let data: ConnectionSpeedData = JSON.parse(message.data) as ConnectionSpeedData;
        ConnectionDataStatistics.Instance.addConnectionData(data);
    }
  }
}


