import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewPage1Component} from './newPage1/newPage1.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    NewPage1Component,
    AppComponent
  ],
    imports: [
  AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
