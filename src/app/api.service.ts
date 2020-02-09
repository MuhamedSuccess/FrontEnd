import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {User} from './models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';
  baseTripUrl = `${this.baseUrl}api/trip/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 6842dcf848c13e7882bc951b4dafaee8da0c6043'
    // 'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
  });
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  getTrips() {
    return this.http.get(this.baseTripUrl, {headers: this.getAuthHeaders()});
  }

   loginUser(authData) {
    const body = JSON.stringify(authData);
    return this.http.post(this.baseUrl + 'account/login/', body, {headers: this.headers});
  }
  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this.http.post(this.baseUrl + 'account/users/', body, {headers: this.headers});
  }

  getUser(id) {
    return this.http.get(this.baseUrl + 'account/users/' + id + '/', {headers: this.headers});
  }

  getUserProfile(id) {
    return this.http.get(this.baseUrl + 'account/profile/' + id + '/', {headers: this.headers});
  }

  check_user_login() {
      const mrToken = this.cookieService.get('mr-token');
      if (!mrToken) {
      this.router.navigate(['/account']);
    } else {
        let user: User;
        user = this.loadLocalUser();
        return user;
    }

  }

  check_user_exists() {
    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      return false;
    } else {return true; }
  }

  getAllUsers() {
    return this.http.get(this.baseUrl + 'account/users/', {headers: this.headers});
  }

   loadLocalUser() {
    const localUser = JSON.parse(localStorage.getItem('current-user'));
    // this.User = localUser;

    const user: User = {
        id: localUser.id,
        username: localUser.username,
        email: localUser.email,
        first_name: localUser.profile.first_name,
        last_name: localUser.profile.last_name,
        city: localUser.profile.city,
        birthDate: localUser.profile.birth_date,
        is_tourist: localUser.profile.is_tourist,
        is_guide: localUser.profile.is_guide,
        is_admin: localUser.profile.is_admin,
        sex: localUser.profile.sex,
        token: ''
     };
    return user;
  }

  // updateProfile(authData, id) {
  //   const body = JSON.stringify(authData);
  //   return this.http.put(this.baseUrl + 'account/profile/' + id + '/edit/', body, {headers: this.headers});
  // }
  updateProfile(authData, id) {
    const body = JSON.stringify(authData);
    return this.http.put(this.baseUrl + 'account/profile/' + id + '/edit/', body, {headers: this.headers});
  }


  getAuthHeaders() {
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}
