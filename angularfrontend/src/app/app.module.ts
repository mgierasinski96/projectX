import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPage1Component } from './newPage1/newPage1.component';
import { FormsModule } from '@angular/forms';
import { ExamplespringService } from './services/examplespring.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SkillPricePipe } from './skill-price.pipe';
import { CheckSkillPossiblePipe } from './check-skill-possible.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    NewPage1Component,
    AppComponent,
    SkillPricePipe,
    CheckSkillPossiblePipe
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
    ],
  providers: [ExamplespringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
