import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
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
import { UserItemsComponent } from './user-items/user-items.component';
import { TrainingComponent } from './training/training.component';
import {LocationComponent} from './location/location.component';
import {ChatService} from './services/chat.service';
import {UserbackpackService} from './services/userbackpack.service';
import { AuctionHouseComponent } from './auction-house/auction-house.component';
import {TemporaryComponent} from './temporary/temporary.component';
import {RankingComponent} from './ranking/ranking.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {UpgradeItemComponent} from './upgradeItem/upgradeItem.component';
import {GuildService} from './services/guild.service';
import { MarketPlaceComponent } from './market-place/market-place.component';



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
    UserItemsComponent,
    TrainingComponent,
    LocationComponent,
    AuctionHouseComponent,
    TemporaryComponent,
    RankingComponent,
    UpgradeItemComponent,
    MarketPlaceComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [PotworService, DropService, ChatService, UserbackpackService, GuildService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
