import { TestBed } from '@angular/core/testing';

import { NgBusyWatchService } from './ng-busy-watch.service';

describe('NgBusyWatchService', () => {
  let service: NgBusyWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgBusyWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
