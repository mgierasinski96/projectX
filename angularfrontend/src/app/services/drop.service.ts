import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {__param} from 'tslib';
import {Params} from '@angular/router';


// Zastosowanie serwisów jest ogromne. W naszym przypadku
// zawiera logikę związaną z interakcją z zewnętrznym API.

@Injectable()
export class DropService {
  API_URL_WHAT_DROP_THIS_ITEM = 'http://localhost:8080/item/drop/';
  API_URL_WHAT_DROPS_THIS_MONSTER = 'http://localhost:8080/monster/monsterdrop/';
  API_URL1 = 'http://localhost:8080/user/getRandomItemsToShop/';

  private currentUser: any;
  constructor(private httpClient: HttpClient) {
  }
   getMonstersWhichDropThisItem(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_WHAT_DROP_THIS_ITEM + id);
  }

  getItemsWhichDropFromThisMonster(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_WHAT_DROPS_THIS_MONSTER + id);
  }
  getRandomItemsToShop(pcs: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL1 + pcs);
  }


}
