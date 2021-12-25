import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBusyWatchDirective } from './ng-busy-watch.directive';

describe('NgBusyWatchComponent', () => {
  let component: NgBusyWatchDirective;
  let fixture: ComponentFixture<NgBusyWatchDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgBusyWatchDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBusyWatchDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
