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

  API_URL = 'http://localhost:8080/user/drop/';


  private currentUser: any;

  constructor(private httpClient: HttpClient) {
  }
   getPowiazane(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + id);
  }

}
