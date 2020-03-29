import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {GuildComponent} from './guild/guild.component';
import {ToastrModule} from 'ngx-toastr';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogRemoveFromGuildComponent } from './userDialogs/dialogRemoveFromGuild/dialogRemoveFromGuild.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DialogAddGuildComponent} from './userDialogs/addToGuildDialog/dialogAddGuild.component';
import {MessageComponent} from './message/message.component';
import {SanitizeHtmlPipe} from './pipes/SanitizeHtmlPipe';
import {GuildStoreComponent} from './guildStore/guildStore.component';



@NgModule({
  declarations: [
    AppComponent,
    PotworComponent,
    MycharacterComponent,
    SkillPricePipe,
    SanitizeHtmlPipe,
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
    MarketPlaceComponent,
    GuildComponent,
    DialogRemoveFromGuildComponent,
    DialogAddGuildComponent,
    MessageComponent,
    GuildStoreComponent

  ],
  entryComponents: [DialogRemoveFromGuildComponent, DialogAddGuildComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatCheckboxModule,
  MatSortModule,
    MatDialogModule,
    MatInputModule,
  ],
  providers: [PotworService, DropService, ChatService, UserbackpackService, GuildService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
