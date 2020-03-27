import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {__param} from 'tslib';
import {Params} from '@angular/router';


@Injectable()
export class UserbackpackService {

  API_URL_GET_USER_ITEMS =                'http://localhost:8080/user/itemyusera/';
  API_URL_GET_USER_ITEMS_BY_USERNAME =    'http://localhost:8080/userbackpack/getUserItemsByUsername/';
  API_URL_TRANSFER_ITEM_TO_DIFF_SLOT =    'http://localhost:8080/userbackpack/transferItemToDifferentSlot/';
  API_URL_ADD_ITEM_TO_USER =              'http://localhost:8080/userbackpack/additemtouser/';
  API_URL_REMOVE_ITEM_FROM_USER =         'http://localhost:8080/userbackpack/removeitemfromuser/';
  API_URL_ITEM_BOUGHT_GENERATE_NEW_ITEM = 'http://localhost:8080/userbackpack/itemBought/';
  API_URL_ITEM_UPGRADE_ITEM =             'http://localhost:8080/userbackpack/upgradeItem/';
  API_URL_ITEM_SELL_ITEM =                'http://localhost:8080/market/addItemForSale/';
  API_URL_GET_MARTKET_ITEMMS =            'http://localhost:8080/market/getMarketItems';
  API_URL_BUY_MARTKET_ITEM =              'http://localhost:8080/market/buyMarketItem/';
  API_URL_REMOVE_ITEM_FROM_MARKET =        'http://localhost:8080/market/removeItemFromMarket/';
  API_URL_ADD_ITEM_TO_NEW_OWNER =        'http://localhost:8080/market/addItemToNewOwner/';
  API_URL_GET_NEW_ITEM =                  'http://localhost:8080/userbackpack/getItem/';


  constructor(private httpClient: HttpClient) {
  }

  getUserItems(userId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_USER_ITEMS + userId);
  }
  getUserItemsByUsername(username: String): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_USER_ITEMS_BY_USERNAME + username);
  }

  transferItemToDifferentSlot(itemId: number, actualSlot: String) {
    return this.httpClient.get<any>(this.API_URL_TRANSFER_ITEM_TO_DIFF_SLOT + itemId + '/' + actualSlot);
  }
  addItemToUser(userId: number, itemId: number, actualSlot: String): Observable<any> {
    return this.httpClient.post(this.API_URL_ADD_ITEM_TO_USER + userId + '/' + itemId + '/' + actualSlot, null);
  }

removeItemFromUser(userId: number, previousSlot: String): Observable<any> {
  return this.httpClient.get(this.API_URL_REMOVE_ITEM_FROM_USER + userId + '/' + previousSlot);
}

  itemBoughtGenerateNewItem(userId: number, itemId: number): Observable<any> {
    return this.httpClient.get(this.API_URL_ITEM_BOUGHT_GENERATE_NEW_ITEM + userId + '/' + itemId);
  }
  upgradeItem(itemId): Observable<any> {
    return this.httpClient.get(this.API_URL_ITEM_UPGRADE_ITEM + itemId);
  }
  listMarketItems(): Observable <any> {
    return this.httpClient.get(this.API_URL_GET_MARTKET_ITEMMS);
  }
  sellItem(price, itemID): Observable <any> {
    return this.httpClient.get(this.API_URL_ITEM_SELL_ITEM + price + '/' + itemID);
  }
  removeItemFromMarket(userItemID: number): Observable <any> {
    return this.httpClient.get(this.API_URL_REMOVE_ITEM_FROM_MARKET + userItemID);
  }
  addItemToNewOwner(userItemID: number, newOwner: string, slot: string): Observable <any> {
    return this.httpClient.get(this.API_URL_ADD_ITEM_TO_NEW_OWNER + userItemID + '/' + newOwner + '/' + slot);
  }
  getBrandNewItem(userItemID: number): Observable <any> {
    return this.httpClient.get(this.API_URL_GET_NEW_ITEM + userItemID);
  }

}
