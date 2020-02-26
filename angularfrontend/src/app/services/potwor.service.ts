import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {__param} from 'tslib';
import {Params} from '@angular/router';


@Injectable()
export class PotworService {

  API_URL_GET_MONSTERS = 'http://localhost:8080/monster/getmonsters';
  API_URL_GET_ITEMS = 'http://localhost:8080/item/getitems';

    constructor(private httpClient: HttpClient) {
  }
  getMonsters(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_MONSTERS );
  }

  getItems(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_ITEMS);
  }
 }
