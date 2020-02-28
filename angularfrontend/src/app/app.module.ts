import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {ExamplespringService} from './services/examplespring.service';
import {MycharacterComponent} from './mycharacter/mycharacter.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PotworComponent} from './potwor/potwor.component';
import {PotworService} from './services/potwor.service';
import {ItemDetailsComponent} from './itemDetails/itemDetails.component';
import {DropService} from './services/drop.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CheckSkillPossiblePipe } from './pipes/check-skill-possible.pipe';
import { GetNextLvlExpPipe } from './pipes/get-next-lvl-exp.pipe';
import { GetExpBarWidthPipe } from './pipes/get-exp-bar-width.pipe';
import { MonsterDetailsComponent } from './monsterDetails/monsterDetails.component';
import { SkillPricePipe } from './pipes/skill-price.pipe';
import {ShopComponent} from './shop/shop.component';
import {LocationComponent} from './location/location.component';



@NgModule({
  declarations: [
    AppComponent,
    PotworComponent,
    MycharacterComponent,
    SkillPricePipe,
    CheckSkillPossiblePipe,
    GetNextLvlExpPipe,
    GetExpBarWidthPipe,
    ItemDetailsComponent,
    MycharacterComponent,
    MonsterDetailsComponent,
    ShopComponent,
    LocationComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [ExamplespringService, PotworService, DropService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
