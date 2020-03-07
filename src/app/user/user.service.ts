import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://127.0.0.1:8000/';
  baseTripUrl = `${this.baseUrl}api/trip/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 6842dcf848c13e7882bc951b4dafaee8da0c6043'
    // 'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
  });
  constructor( private http: HttpClient,
               private cookieService: CookieService,
               private router: Router) { }

  getAllUsers() {
    return this.http.get(this.baseUrl + 'account/users/', {headers: this.headers});
  }





}
