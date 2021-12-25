import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, isObservable, of, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { BusyOverlayComponent } from './busy-overlay/busy-overlay.component';

@Directive({
  selector: `[ngBusyWatch]`,
})
export class NgBusyWatchDirective implements OnChanges, OnDestroy {

  @Input('ngBusyWatch')
  busyIndicator?: Observable<any> | boolean;

  view: EmbeddedViewRef<any>;
  overlayComp?: ComponentRef<BusyOverlayComponent>;

  changes$?: Observable<any>;
  compDest$: Subject<void> = new Subject<void>();

  hostElement: HTMLElement;
  parentElement: HTMLElement | null;

  parentOriginalDisplayStyle: string | undefined;
  hostOriginalRowStart: any;
  hostOriginalRowEnd: any;
  hostOriginalColumnStart: any;
  hostOriginalColumnEnd: any;

  constructor(
    private renderer: Renderer2,
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {
    this.view = this.vcr.createEmbeddedView(this.templateRef);
    this.hostElement = this.view?.rootNodes[0];
    this.parentElement = this.hostElement?.parentElement;
    this.parentOriginalDisplayStyle = this.getParentOriginalStyle(this.parentElement);
    this.saveHostGridStyle(this.hostElement);
  }

  ngOnChanges() {
    const isObs: boolean = isObservable(this.busyIndicator);
    if (isObs) {
      this.changes$ = (this.busyIndicator as Observable<any>).pipe(
        takeUntil(this.compDest$)
      );
    } else {
      this.changes$ = of(!!this.busyIndicator).pipe(take(1));
    }
    if (this.changes$) {
      this.main(this.changes$);
    }
  }

  main(changes: Observable<any>) {
    changes.subscribe((changed) => {
      if (changed) {
        if (this.hostElement) {
          this.setGridAreaOneOne(this.hostElement);
        }
        if (this.parentElement) {
          this.renderer.setStyle(this.parentElement, 'display', 'grid');
        }
        this.overlayComp = this.vcr.createComponent(BusyOverlayComponent);

        if (this.overlayComp?.location?.nativeElement) {
          this.addStyleToOverlay(this.overlayComp.location.nativeElement);
        }
      } else {
        if (this.hostElement) {
          this.resetHostGridStyle(this.hostElement);
        }
        if (this.parentElement) {
          this.renderer.setStyle(
            this.parentElement,
            'display',
            this.getInitDisplayStyleIfNullish(this.parentOriginalDisplayStyle)
          );
        }
        this.overlayComp?.destroy();
      }
    });
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
