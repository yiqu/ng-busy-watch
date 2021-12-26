import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BusyOverlayComponent } from './busy-overlay/busy-overlay.component';
import { NgBusyWatchDirective } from './ng-busy-watch.directive';
import { BUSY_CONFIG, DefaultGlobalConfig, IGlobalConfig } from './ng-busy-watch.model';
import { NgBusyWatchService } from './ng-busy-watch.service';

export const BusyDefaultGlobalConfig: IGlobalConfig = {
  ...DefaultGlobalConfig
};

@NgModule({
  declarations: [
    NgBusyWatchDirective,
    BusyOverlayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgBusyWatchDirective
  ],
})
export class NgBusyWatchModule {
  static forRoot(config: Partial<IGlobalConfig> = {}): ModuleWithProviders<NgBusyWatchModule> {
    return {
      ngModule: NgBusyWatchModule,
      providers: [
        {
          provide: BUSY_CONFIG,
          useValue: {
            default: DefaultGlobalConfig,
            config,
          },
        },
      ],
    };
  }
}
