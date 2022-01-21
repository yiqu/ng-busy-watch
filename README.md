<div align="center">
  <img src="https://raw.githubusercontent.com/yiqu/ng-busy-watch/master/projects/ng-busy-watch-app/src/assets/ex1.png" width="300" alt="NgBusy Watch">
  <br>
  <h1>ng-busy-watch</h1>
  <br>
  <a href="https://www.npmjs.com/package/ng-busy-watch">
    <img src="https://img.shields.io/npm/v/ng-busy-watch.svg" alt="npm">
  </a>
  <a href="https://app.travis-ci.com/github/yiqu/ng-busy-watch">
    <img src="https://app.travis-ci.com/yiqu/ng-busy-watch.svg?branch=master" alt="travisci">
  </a>
  <a href="https://www.npmjs.com/package/ng-busy-watch">
    <img src="https://img.shields.io/npm/dt/ng-busy-watch?color=%23006600&logoColor=%23006600" alt="codecov">
  </a>
  <br>
  <br>
</div>

DEMO: https://yiqu.github.io/ng-busy-watch/

## Features

- Works for long-lived Observables. Loading indicator will be shown when value is evaluated to `true`, hide if `false`.
- Will also take in a simple boolean value.
- Customizable loading message.
- Add your own CSS class to customize colors and background of loading indicator.

## Dependencies

Latest version available for each version of Angular

| ngx-busy-watch | Angular     |
| ---------- | ----------- |
| 13.x.x     | 13.x.x      |
| 10.x.x     | < 13.x.x      |

## Install

```bash
npm install ng-busy-watch --save
```

## Usage

Using ng-busy-watch with `Subjects`:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private busySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public busy$ = this.overAllBusyIndicator.asObservable();
}
```

```html
<div>
  <div *ngBusyWatch="busy$" class="ex">
    ...
  </div>
</div>
```

Using ng-busy-watch with NgRx `selectors`:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading$ = this.store.select(fromSelectors.isLoading);
  constructor(private store: Store<AppState>) {
  }
}
```

```html
<div>
  <div *ngBusyWatch="loading$" class="ex">
    ... 
  </div>
</div>
```

Using ng-busy-watch with `Boolean`:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading: boolean = true;
}
```

```html
<div>
  <div *ngBusyWatch="loading" class="ex">
    ... 
  </div>
</div>
```

## Customizable Global Options
| Option                  | Type    | Default                            | Description                                                                                                   |
| ----------------------- | ------- | ---------------------------------- | ------------------------------------------------------------------ |
| extraCssClass               | string  | empty                                  | Extra CSS class for loading indicator           |
| message             | string | Please wait...                              | Loading indicator text                          |
| showSpinner             | boolean  | true | Whether to show loading animation SVG                            |


### Setting Global Options

Pass values to `NgBusyWatchModule.forRoot()`

```typescript
// root app NgModule
imports: [
  NgBusyWatchModule.forRoot({
    extraCssClass: 'cool-css-class',
    message: 'Loading..',
    showSpinner: true
  }),
],
```

Or just leave it as `NgBusyWatchModule` to use its default values.

```typescript
// root app NgModule
imports: [
  NgBusyWatchModule
],
