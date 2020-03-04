import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = 'http://127.0.0.1:8000/';
  baseTripUrl = `${this.baseUrl}api/trip/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 6842dcf848c13e7882bc951b4dafaee8da0c6043'
    // 'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
  });
  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router) { }

   updateProfile(authData, id) {
    const body = JSON.stringify(authData);
    return this.http.post(this.baseUrl + 'account/profile/' + id + '/edit/', body, {headers: this.headers});
  }

  getUserProfile(id) {
    return this.http.get(this.baseUrl + 'account/profile/' + id + '/', {headers: this.headers});
  }

}
