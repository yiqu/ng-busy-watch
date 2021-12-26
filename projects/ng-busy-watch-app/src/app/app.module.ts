import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgBusyWatchModule } from 'ng-busy-watch';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MaterialModuleBundle } from './shared/material-bundle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/global/app.reducer';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { appEffects } from './store/global/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModuleBundle,
    HttpClientModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
        strictActionTypeUniqueness: true
      }
    }),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 45,
    }),
    NgBusyWatchModule.forRoot({
      extraCssClass: 'cool-busy',
      message: 'Loading..',
      showSpinner: true
    })
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
