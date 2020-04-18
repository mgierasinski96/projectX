import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LocationService {


  API_URL_GET_LOCATION = 'http://localhost:8080/location/locationDescription/';
  API_URL_GET_LOCATION_BY_ID = 'http://localhost:8080/location/locationDescriptionByID/';
  API_URL_GET_LOCATION_FIGHT = 'http://localhost:8080/fight/';

  constructor(private httpClient: HttpClient) {
  }

  getLocationDescription(locationID): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_LOCATION + locationID);
  }
  getLocationDescriptionByID(locationID): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_LOCATION_BY_ID + locationID);
  }
  getLocationFight(locationID, userName): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_GET_LOCATION_FIGHT + locationID + '/' + userName);
  }

}
