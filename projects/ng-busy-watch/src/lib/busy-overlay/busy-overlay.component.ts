import { Component, Inject, OnInit, Optional } from '@angular/core';
import { BUSY_CONFIG, BusyWatchToken } from '../ng-busy-watch.model';
import { NgBusyWatchService } from '../ng-busy-watch.service';

@Component({
  selector: 'app-busy-overlay',
  templateUrl: 'busy-overlay.component.html',
  styleUrls: ['./busy-overlay.component.scss']
})
export class BusyOverlayComponent implements OnInit {

  showSpinner: boolean = true;
  loadingText: string = 'Please wait...';
  extraCssClass?: string;

  constructor(public bs: NgBusyWatchService, @Optional() @Inject(BUSY_CONFIG) private busyConfigToken: BusyWatchToken) {
    this.showSpinner = busyConfigToken.config.showSpinner ?? busyConfigToken.default.showSpinner;
    this.loadingText = busyConfigToken.config.message ?? busyConfigToken.default.message;
    this.extraCssClass = busyConfigToken.config.extraCssClass ?? '';
  }

  ngOnInit() {
  }
}
