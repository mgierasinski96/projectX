import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  baseurl = 'http://127.0.0.1:8000';
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    return this.http.post(this.baseurl + '/user/users/', userData);
  }
  loginUser(userData): Observable<any> {
    return this.http.post(this.baseurl + '/user/auth/', userData);
  }
  getUserData(): Observable<any> {
    console.log(window.sessionStorage.getItem('token'));
    this.httpHeaders = new HttpHeaders({'Authorization': window.sessionStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    return this.http.get(this.baseurl + '/user/users/', {headers: this.httpHeaders});
  }

}
