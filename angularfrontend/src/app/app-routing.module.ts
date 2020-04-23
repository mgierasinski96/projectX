import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {PotworComponent} from './views/potwor/potwor.component';
import {ItemDetailsComponent} from './POZOSTALE/itemDetails/itemDetails.component';
import {ShopComponent} from './views/shop/shop.component';
import {MycharacterComponent} from './views/mycharacter/mycharacter.component';
import {MonsterDetailsComponent} from './POZOSTALE/monsterDetails/monsterDetails.component';
import {UserItemsComponent} from './POZOSTALE/user-items/user-items.component';
import {TrainingComponent} from './POZOSTALE/training/training.component';
import {LocationComponent} from './views/location/location.component';
import {AuctionHouseComponent} from './views/auction-house/auction-house.component';
import {TemporaryComponent} from './POZOSTALE/temporary/temporary.component';
import {RankingComponent} from './views/ranking/ranking.component';
import {UpgradeItemComponent} from './views/upgradeItem/upgradeItem.component';
import {MarketPlaceComponent} from './views/market-place/market-place.component';
import {GuildComponent} from './views/guild/guild.component';
import {MessageComponent} from './views/message/message.component';
import {GuildStoreComponent} from './POZOSTALE/guildStore/guildStore.component';
import {FightComponent} from './POZOSTALE/fight/fight.component';
import {HomeComponent} from './views/home/home.component';
import {RegisterComponent} from './views/register/register.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';


// Delkaracja na jakim url ma się wyrenderować jaki komponent. Pojawi się w miejscu deklaracji <router-outlet>
const routes: Routes = [
  {path: 'potwor', component: PotworComponent},
  {path: 'item/:id', component: ItemDetailsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'monster/:id', component: MonsterDetailsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'ranking/user/:user', component: RankingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'myMenu', component: MycharacterComponent, canActivate: [AuthGuard]},
  {path: 'shop', component: ShopComponent, canActivate: [AuthGuard]},
  {path: 'blacksmith', component: UpgradeItemComponent, canActivate: [AuthGuard]},
  {path: 'user-items', component: UserItemsComponent, canActivate: [AuthGuard]},
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]},
  {path: 'location1', component: LocationComponent, canActivate: [AuthGuard]},
  {path: 'auctions', component: AuctionHouseComponent, canActivate: [AuthGuard]},
  {path: 'tmp', component: TemporaryComponent, canActivate: [AuthGuard]},
  {path: 'ranking', component: RankingComponent, canActivate: [AuthGuard]},
  {path: 'market-place', component: MarketPlaceComponent, canActivate: [AuthGuard]},
  {path: 'ranking/guild/:guildName', component: RankingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'ranking/user/:user', component: RankingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'guild', component: GuildComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessageComponent, canActivate: [AuthGuard]},
  {path: 'guildStore', component: GuildStoreComponent, canActivate: [AuthGuard]},
  {path: 'fight', component: FightComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: RegisterComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
