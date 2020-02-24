import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewPage1Component} from './newPage1/newPage1.component';
import {PotworComponent} from './potwor/potwor.component';
import {DropComponent} from './drop/drop.component';
import {MycharacterComponent} from './mycharacter/mycharacter.component';

// Delkaracja na jakim url ma się wyrenderować jaki komponent. Pojawi się w miejscu deklaracji <router-outlet>
const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'potwor', component: PotworComponent},
  {path: 'newPage1', component: NewPage1Component},
  {path: 'drop/:id', component: DropComponent, pathMatch: 'full'},
  {path: 'newPage1', component: NewPage1Component},
  {path: 'myMenu', component: MycharacterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
