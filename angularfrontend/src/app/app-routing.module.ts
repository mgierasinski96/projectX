import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PotworComponent} from './potwor/potwor.component';
import {ItemDetailsComponent} from './itemDetails/itemDetails.component';
import {ShopComponent} from './shop/shop.component';
import {MycharacterComponent} from './mycharacter/mycharacter.component';
import {MonsterDetailsComponent} from './monsterDetails/monsterDetails.component';
import {UserItemsComponent} from './user-items/user-items.component';
import {TrainingComponent} from './training/training.component';
import {LocationComponent} from './location/location.component';
import {AuctionHouseComponent} from './auction-house/auction-house.component';


// Delkaracja na jakim url ma się wyrenderować jaki komponent. Pojawi się w miejscu deklaracji <router-outlet>
const routes: Routes = [
  {path: 'potwor', component: PotworComponent},
  {path: 'item/:id', component: ItemDetailsComponent, pathMatch: 'full'},
  {path: 'monster/:id', component: MonsterDetailsComponent, pathMatch: 'full'},
  {path: 'myMenu', component: MycharacterComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'user-items', component: UserItemsComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'location1', component: LocationComponent},
  {path: 'auctions', component: AuctionHouseComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
