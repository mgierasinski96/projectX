import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewPage1Component} from './newPage1/newPage1.component';
import {FormsModule} from '@angular/forms';
import {ExamplespringService} from './services/examplespring.service';
import {MycharacterComponent} from './mycharacter/mycharacter.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PotworComponent} from './potwor/potwor.component';
import {PotworService} from './services/potwor.service';
import {DropComponent} from './drop/drop.component';
import {DropService} from './services/drop.service';


@NgModule({
  declarations: [
    DashboardComponent,
    NewPage1Component,
    AppComponent,
    PotworComponent,
    DropComponent,
    MycharacterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [ExamplespringService, PotworService, DropService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
