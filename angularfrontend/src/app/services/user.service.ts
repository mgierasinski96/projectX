import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserData} from '../models/user-data';
import {SkillPricePipe} from '../pipes/skill-price.pipe';

@Injectable()
export class UserService {

  baseurl = 'http://localhost:8000';
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    return this.http.post(this.baseurl + '/create/', userData);
  }
  loginUser(userData): Observable<any> {
    return this.http.post(this.baseurl + '/auth/', userData);
  }
  getUserData(): Observable<any> {
    console.log('getUserdata: ', localStorage.getItem('token'));
    this.httpHeaders = new HttpHeaders({Authorization: localStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    return this.http.get(this.baseurl + '/user/', {headers: this.httpHeaders});
  }

  addStat(userData, statName): Observable<any> {
    const price = new SkillPricePipe().transform(statName, userData[statName]);
    const body = {gold: userData.gold - price};
    body[statName] = userData[statName] + 1;
    console.log('add stat service!');
    this.httpHeaders = new HttpHeaders({Authorization: localStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    return this.http.patch(this.baseurl + '/user/' + userData.id + '/', body, {headers: this.httpHeaders});
  }

  addExpPoints(userData, addedExpPoints): Observable<any> {
    const body = {exp: userData.exp + addedExpPoints, total_exp: userData.total_exp + addedExpPoints};
    this.httpHeaders = new HttpHeaders({Authorization: localStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    return this.http.patch(this.baseurl + '/user/' + userData.id + '/', body, {headers: this.httpHeaders});
  }

  addLevel(userData): Observable<any> {
    const body = {level: userData.level, exp: userData.exp};
    this.httpHeaders = new HttpHeaders({Authorization: localStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    return this.http.patch(this.baseurl + '/user/' + userData.id + '/', body, {headers: this.httpHeaders});
  }

  getUserSkills(userData): Observable<any> {
    this.httpHeaders = new HttpHeaders({Authorization: localStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    return this.http.get(this.baseurl + '/user/' + userData.id + '/get-stats/', {headers: this.httpHeaders});
  }

  getSkillPrices(userData): Observable<any> {
    this.httpHeaders = new HttpHeaders({Authorization: localStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    return this.http.get(this.baseurl + '/user/' + userData.id + '/stats-price/', {headers: this.httpHeaders});
  }
  addSkill(userData, skill): Observable<any> {
    this.httpHeaders = new HttpHeaders({Authorization: localStorage.getItem('token'),
                                           'Content-Type': 'application/json'});
    const body = {skill: skill};
    return this.http.patch(this.baseurl + '/user/' + userData.id + '/training/', body, {headers: this.httpHeaders});
  }
}
