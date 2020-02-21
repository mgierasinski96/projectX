import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import {UserData} from '../models/user-data';

@Injectable()
export class UserService {

  baseurl = 'http://127.0.0.1:8000';
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    console.log(userData);
    return this.http.post(this.baseurl + '/create/', userData);
  }
  loginUser(userData): Observable<any> {
    return this.http.post(this.baseurl + '/auth/', userData);
  }
  getUserData(): Observable<UserData[]> {
    console.log(window.sessionStorage.getItem('token'));
    this.httpHeaders = new HttpHeaders({'Authorization': window.sessionStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    return this.http.get<UserData[]>(this.baseurl + '/user/', {headers: this.httpHeaders});
  }

  addStrength(user_data) Observable<any> {
    
  }
}
