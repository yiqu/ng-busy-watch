import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgBusyWatchModule } from 'ng-busy-watch';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { MaterialModuleBundle } from './shared/material-bundle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgBusyWatchModule,
    FlexLayoutModule,
    MaterialModuleBundle
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
