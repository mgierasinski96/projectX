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
  API_URL_RANDOM_ITEMS_TO_AUCTION = 'http://localhost:8080/auciton/getRandomItemsToAuctionHouse';
  API_URL_SAVE_ACTUAL_PRICE = 'http://localhost:8080/auction/updateActualPrice/';
  API_URL_LIST_AUCTION_ITEMS = 'http://localhost:8080/auction/auctionItems';
  API_URL_UPDATE_AUCTION = 'http://localhost:8080/auction/updateAuction';


  private currentUser: any;
  constructor(private httpClient: HttpClient) {
  }
   getMonstersWhichDropThisItem(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_WHAT_DROP_THIS_ITEM + id);
  }

  getItemsWhichDropFromThisMonster(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_WHAT_DROPS_THIS_MONSTER + id);
  }
  getShopItemsForUser(userId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL1 + userId);
  }
    getRandomItemsForAuction(): Observable <any> {
    return this.httpClient.get<any> (this.API_URL_RANDOM_ITEMS_TO_AUCTION);
  }
  confirmBid(price: String, id: number, userID: number): Observable <any> {
    console.log(price);
    console.log(id);
    console.log(userID);
    return this.httpClient.get<any>(this.API_URL_SAVE_ACTUAL_PRICE + price + '/' + id + '/' + userID);
  }
  listAuctionItems(): Observable <any> {
    return this.httpClient.get<any> (this.API_URL_LIST_AUCTION_ITEMS);
  }
  updateAuction(): Observable <any> {
    return this.httpClient.get<any> (this.API_URL_UPDATE_AUCTION);
  }
}
