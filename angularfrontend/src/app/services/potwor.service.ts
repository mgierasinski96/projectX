import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {__param} from 'tslib';
import {Params} from '@angular/router';


// Zastosowanie serwisów jest ogromne. W naszym przypadku
// zawiera logikę związaną z interakcją z zewnętrznym API.

@Injectable()
export class PotworService {
  // Pobieranie z environment zmiennej środowiskowej reprezentującej url do serwisu studentów za pośrednictwem gateway
  API_URL_SPRINGUSER = 'http://localhost:8080/user/getmonsters';
  API_URL_SPRINGUSER_ITEM = 'http://localhost:8080/user/getitems';
  API_URL_SPRINGUSER_POWIAZANE = 'http://localhost:8080/user/powiazane/2';

//  API_URL_APARTMENT = environment.API_URL_APARTMENTS;

  private currentUser: any;

  // W konstruktorze wstrzykiwany jest klient http
  constructor(private httpClient: HttpClient) {
  }
  getMonsters(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_SPRINGUSER );
  }
  getItems(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_SPRINGUSER_ITEM);
  }
  getPowiazane(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_SPRINGUSER_POWIAZANE);
  }

}
