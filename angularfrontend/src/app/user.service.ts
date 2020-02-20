import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  baseurl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    return this.http.post(this.baseurl + '/user/users/', userData);
  }
  loginUser(userData): Observable<any> {
    return this.http.post(this.baseurl + '/user/auth/', userData);
  }

}
