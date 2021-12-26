import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

/**
 * Default Busy global configuration
 */
export const DefaultGlobalConfig: IGlobalConfig = {
  extraCssClass: undefined,
  message: 'Please wait...',
  showSpinner: true
}

/**
 * Global Busy configuration
 */
 export interface IGlobalConfig {
  showSpinner: boolean;
  message: string;
  extraCssClass:  string | undefined;
}

export interface IBusyConfigInput {
  busy: Observable<any> | boolean,
  showSpinner?: boolean;
  message?: string;
  extraCssClass?: string | undefined;
}

export interface BusyWatchToken {
  default: IGlobalConfig;
  config: Partial<IGlobalConfig>;
}

export const BUSY_CONFIG = new InjectionToken<BusyWatchToken>('BusyWatchConfig');
