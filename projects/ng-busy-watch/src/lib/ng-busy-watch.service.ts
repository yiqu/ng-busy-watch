import { Inject, Injectable, Optional } from '@angular/core';
import { BusyWatchToken, BUSY_CONFIG, DefaultGlobalConfig, IGlobalConfig } from './ng-busy-watch.model';

@Injectable({
  providedIn: 'root'
})
export class NgBusyWatchService {

  public busyConfig: IGlobalConfig;

  constructor(@Optional() @Inject(BUSY_CONFIG) private busyConfigToken: BusyWatchToken) {
    this.busyConfig = {
      ...this.busyConfigToken?.default ?? DefaultGlobalConfig,
      ...this.busyConfigToken?.config
    }
  }

  resetBusyConfig() {
    this.busyConfig = {
      ...DefaultGlobalConfig,
      ...this.busyConfigToken?.config
    }
  }
}
