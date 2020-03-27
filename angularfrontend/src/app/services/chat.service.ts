import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {__param} from 'tslib';
import {Params} from '@angular/router';


// Zastosowanie serwisów jest ogromne. W naszym przypadku
// zawiera logikę związaną z interakcją z zewnętrznym API.

@Injectable()
export class ChatService {
  API_URL_GET_CHAT_MESSAGES = 'http://localhost:8080/getAllChatMessages';
  API_URL_SAFE_CHAT_MESSEGE = 'http://localhost:8080/safeChatMessage/';
  API_URL_GET_PRIVATE_MESSAGES = 'http://localhost:8080/getPrivateMessages/';
  API_URL_WRITE_PRIVATE_MESSAGE = 'http://localhost:8080/writePrivateMessage/';

  private currentUser: any;
  constructor(private httpClient: HttpClient) {
  }
  getAllChatMessages(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_CHAT_MESSAGES);
  }
  safeNewMessage(userId: number, messegeContent: String): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_SAFE_CHAT_MESSEGE + userId + '/' + messegeContent);
  }
  getPrivateMessages(username: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_PRIVATE_MESSAGES + username);
  }

  writePrivateMessage(message): Observable<any> {
    return this.httpClient.post(this.API_URL_WRITE_PRIVATE_MESSAGE, message);
  }

  }
