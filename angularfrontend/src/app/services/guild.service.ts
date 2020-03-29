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
  getGuildLeaderByGuildName(guildName: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GUILD + '/getGuildLeaderByGuildName/' + guildName);
  }
  getGuildByGuildName(guildName: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GUILD + '/getGuildByGuildName/' + guildName);
  }

  removeFromGuild(username: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GUILD + '/removeFromGuild/' + username);
  }
  saveGuild(guild, leaderUsername: string ): Observable<any> {
    return this.httpClient.post(this.API_URL_GUILD + '/' + leaderUsername, guild);

  }
  sendGuildInvitation(invitedUsername: string, ivitingUsername: string, guildName: string ): Observable<any> {
    return this.httpClient.get(this.API_URL_GUILD + '/sendInvitation/' + invitedUsername + '/' + ivitingUsername + '/' + guildName);

  }
  donateGuildGold(amount: number, username: string): Observable<any> {
    return this.httpClient.get(this.API_URL_GUILD + '/donateGuildGold/' + amount + '/' + username);

  }
  addUserItemToGuildStore(userItemId: number, guildSlot: String): Observable<any> {
    return this.httpClient.get(this.API_URL_GUILD + '/addUserItemToGuildStore/' + userItemId + '/' + guildSlot);

  }

  removeUserItemFromGuildStoreAndAddToUser(userItemId: number, username: String, userBackpackSlot: String): Observable<any> {
    return this.httpClient.get(this.API_URL_GUILD + '/removeUserItemFromGuildStoreAndAddToUser/' +
      userItemId + '/' + username + '/' + userBackpackSlot);

  }

}
