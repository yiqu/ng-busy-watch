import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, isObservable, of, Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { BusyOverlayComponent } from './busy-overlay/busy-overlay.component';
import { BusyWatchToken, BUSY_CONFIG, IBusyConfigInput, IGlobalConfig } from './ng-busy-watch.model';
import { NgBusyWatchService } from './ng-busy-watch.service';
import { isObject } from './ng-busy-watch.utils';

@Directive({
  selector: `[ngBusyWatch]`,
})
export class NgBusyWatchDirective implements OnChanges, OnDestroy {

  @Input('ngBusyWatch')
  busyIndicator?: Observable<any> | boolean | IBusyConfigInput;

  view: EmbeddedViewRef<any>;
  overlayComp?: ComponentRef<BusyOverlayComponent>;
  customConfig?: IBusyConfigInput;

  changes$?: Observable<any>;
  compDest$: Subject<void> = new Subject<void>();

  hostElement: HTMLElement;
  parentElement: HTMLElement | null;

  parentOriginalDisplayStyle: string | undefined;
  hostOriginalRowStart: any;
  hostOriginalRowEnd: any;
  hostOriginalColumnStart: any;
  hostOriginalColumnEnd: any;

  constructor(private renderer: Renderer2, private templateRef: TemplateRef<any>, private vcr: ViewContainerRef,
    private bs: NgBusyWatchService) {
    this.view = this.vcr.createEmbeddedView(this.templateRef);
    this.hostElement = this.view?.rootNodes[0];
    this.parentElement = this.hostElement?.parentElement;
    this.parentOriginalDisplayStyle = this.getParentOriginalStyle(this.parentElement);
    this.saveHostGridStyle(this.hostElement);
  }

  ngOnChanges() {
    this.bs.resetBusyConfig();
    this.compDest$.next();

    if (isObservable(this.busyIndicator)) {
      this.changes$ = (this.busyIndicator as Observable<any>).pipe(
        takeUntil(this.compDest$)
      );
    } else if (isObject(this.busyIndicator)) {
      if (isObservable((this.busyIndicator as IBusyConfigInput).busy)) {
        this.changes$ = ((this.busyIndicator as IBusyConfigInput).busy as Observable<any>).pipe(
          takeUntil(this.compDest$)
        );
      } else {
        const val = !!((this.busyIndicator as IBusyConfigInput).busy);
        this.changes$ = new BehaviorSubject(val).asObservable();
      }
      this.customConfig = (this.busyIndicator as IBusyConfigInput);
    } else {
      const val = !!this.busyIndicator;
      this.changes$ = new BehaviorSubject(val).asObservable();
    }

    if (this.changes$) {
      this.main(this.changes$);
    }
  }

  main(changes: Observable<any>) {
    changes.pipe(
      map((val) => {
        return !!val;
      }),
      distinctUntilChanged(),
    ).subscribe(
      {
        next: (result) => this.onValueChange(result),
        error: (err) => this.removeOverlay(),
        complete: () => {
          console.log("completed")
          this.removeOverlay()
        }
      }
    );
  }

  onValueChange(incoming: boolean | any) {
    console.log('running', incoming)
    if (incoming) {
      if (this.hostElement) {
        this.setGridAreaOneOne(this.hostElement);
      }
      if (this.parentElement) {
        this.renderer.setStyle(this.parentElement, 'display', 'grid');
      }
      this.overlayComp = this.vcr.createComponent(BusyOverlayComponent);
      if (this.customConfig) {
        this.overlayComp.instance.showSpinner = this.customConfig.showSpinner ??  this.bs.busyConfig.showSpinner;
        this.overlayComp.instance.loadingText = this.customConfig.message ?? this.bs.busyConfig.message;
        this.overlayComp.instance.extraCssClass = this.customConfig.extraCssClass ??
          (this.bs.busyConfig.extraCssClass ?? '');
      }

      if (this.overlayComp?.location?.nativeElement) {
        this.addStyleToOverlay(this.overlayComp.location.nativeElement);
      }

    } else {
      this.removeOverlay();
    }
  }

  removeOverlay() {
    if (this.hostElement) {
      this.resetHostGridStyle(this.hostElement);
    }
    if (this.parentElement) {
      this.renderer.setStyle(this.parentElement, 'display',
        this.getInitDisplayStyleIfNullish(this.parentOriginalDisplayStyle)
      );
    }
    this.overlayComp?.destroy();
  }

  getInitDisplayStyleIfNullish(style: string | undefined): string {
    return style ? style : 'initial';
  }

  getParentOriginalStyle(ele: HTMLElement | null): string | undefined {
    return ele?.style?.display;
  }

  saveHostGridStyle(hostEle: HTMLElement): void {
    if (hostEle) {
      this.hostOriginalColumnEnd = hostEle.style?.gridColumnEnd;
      this.hostOriginalColumnStart = hostEle.style?.gridColumnStart;
      this.hostOriginalRowEnd = hostEle.style?.gridRowEnd;
      this.hostOriginalRowStart = hostEle.style?.gridRowStart;
    }
  }

  addStyleToOverlay(ele: any): void {
    this.renderer.setStyle(ele, 'background-color', '#eeeeeedb');
    this.renderer.setStyle(ele, 'z-index', 9999);
    this.setGridAreaOneOne(ele);
  }

  setGridAreaOneOne(ele: any): void {
    if (ele) {
      this.renderer.setStyle(ele, 'grid-row-start', 1);
      this.renderer.setStyle(ele, 'grid-column-start', 1);
      this.renderer.setStyle(ele, 'grid-row-end', 'auto');
      this.renderer.setStyle(ele, 'grid-column-end', 'auto');
    }
  }

  resetHostGridStyle(hostEle: HTMLElement): void {
    this.removeHostGridStyle(hostEle);
    if (this.hostOriginalRowStart !== '') {
      this.renderer.setStyle(
        hostEle,
        'grid-row-start',
        this.hostOriginalRowStart
      );
    }
    if (this.hostOriginalRowEnd !== '') {
      this.renderer.setStyle(hostEle, 'grid-row-end', this.hostOriginalRowEnd);
    }
    if (this.hostOriginalColumnStart !== '') {
      this.renderer.setStyle(
        hostEle,
        'grid-column-start',
        this.hostOriginalColumnStart
      );
    }
    if (this.hostOriginalColumnEnd !== '') {
      this.renderer.setStyle(
        hostEle,
        'grid-column-end',
        this.hostOriginalColumnEnd
      );
    }
  }

  removeHostGridStyle(ele: any): void {
    this.renderer.removeStyle(ele, 'grid-row-start');
    this.renderer.removeStyle(ele, 'grid-column-start');
    this.renderer.removeStyle(ele, 'grid-column-end');
    this.renderer.removeStyle(ele, 'grid-row-end');
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
