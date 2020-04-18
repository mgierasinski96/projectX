import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MycharacterComponent} from './POZOSTALE/mycharacter/mycharacter.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PotworComponent} from './views/potwor/potwor.component';
import {PotworService} from './services/potwor.service';
import {ItemDetailsComponent} from './POZOSTALE/itemDetails/itemDetails.component';
import {DropService} from './services/drop.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CheckSkillPossiblePipe } from './pipes/check-skill-possible.pipe';
import { GetNextLvlExpPipe } from './pipes/get-next-lvl-exp.pipe';
import { GetExpBarWidthPipe } from './pipes/get-exp-bar-width.pipe';
import { MonsterDetailsComponent } from './POZOSTALE/monsterDetails/monsterDetails.component';
import { SkillPricePipe } from './pipes/skill-price.pipe';
import {ShopComponent} from './views/shop/shop.component';
import { UserItemsComponent } from './POZOSTALE/user-items/user-items.component';
import { TrainingComponent } from './POZOSTALE/training/training.component';
import {LocationComponent} from './views/location/location.component';
import {ChatService} from './services/chat.service';
import {UserbackpackService} from './services/userbackpack.service';
import { AuctionHouseComponent } from './views/auction-house/auction-house.component';
import {TemporaryComponent} from './POZOSTALE/temporary/temporary.component';
import {RankingComponent} from './views/ranking/ranking.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {UpgradeItemComponent} from './views/upgradeItem/upgradeItem.component';
import {GuildService} from './services/guild.service';
import { MarketPlaceComponent } from './views/market-place/market-place.component';
import {GuildComponent} from './views/guild/guild.component';
import {ToastrModule} from 'ngx-toastr';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogRemoveFromGuildComponent } from './userDialogs/dialogRemoveFromGuild/dialogRemoveFromGuild.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DialogAddGuildComponent} from './userDialogs/addToGuildDialog/dialogAddGuild.component';
import {MessageComponent} from './views/message/message.component';
import {SanitizeHtmlPipe} from './pipes/SanitizeHtmlPipe';
import {GuildStoreComponent} from './POZOSTALE/guildStore/guildStore.component';
import {LocationService} from './services/location.service';
import { FightComponent } from './POZOSTALE/fight/fight.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';





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
    GuildStoreComponent,
    FightComponent,
    HomeComponent,
    RegisterComponent,

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
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })
  ],
  providers: [PotworService, DropService, ChatService, UserbackpackService, GuildService, LocationService, AuthService, AuthGuardService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
