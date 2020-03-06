import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {

   baseUrl = 'http://127.0.0.1:8000/';
  baseTripUrl = `${this.baseUrl}api/trip/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 6842dcf848c13e7882bc951b4dafaee8da0c6043'
    // 'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
  });
  constructor( private http: HttpClient,
               private cookieService: CookieService,
               private authService: AuthService,
               private router: Router) { }


   createTrip(trip) {
    // const body = JSON.stringify(trip);
    return this.http.post(this.baseUrl + 'api/trip/', trip, {headers: this.authService.getAuthHeadersAndFormData()});
  }

  getAllTrips() {
    return this.http.get(this.baseTripUrl, {headers: this.authService.getAuthHeaders()});
  }
   getAllTourPlans() {
    return this.http.get(this.baseUrl + 'api/tour-plan/', {headers: this.authService.getAuthHeaders()});
  }

  getAllTourismTypes() {
    return this.http.get(this.baseUrl + 'api/tourism-types/', {headers: this.authService.getAuthHeaders()});
  }
}
