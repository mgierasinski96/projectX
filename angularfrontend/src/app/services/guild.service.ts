import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {__param} from 'tslib';
import {Params} from '@angular/router';


// Zastosowanie serwisów jest ogromne. W naszym przypadku
// zawiera logikę związaną z interakcją z zewnętrznym API.

@Injectable()
export class GuildService {
  API_URL_GUILD = 'http://localhost:8080/guild';
  constructor(private httpClient: HttpClient) {
  }
  getAllGuilds(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GUILD);
  }
getGuildMembersByGuildName(guildName: string): Observable<any> {
  return this.httpClient.get<any>(this.API_URL_GUILD + '/getGuildMembersByGuildName/' + guildName);
}
  getGuildByGuildName(guildName: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GUILD + '/getGuildByGuildName/' + guildName);
  }

}
