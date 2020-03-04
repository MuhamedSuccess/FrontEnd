import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {BehaviorSubject, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   baseUrl = 'http://127.0.0.1:8000/';
  baseTripUrl = `${this.baseUrl}api/trip/`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 6842dcf848c13e7882bc951b4dafaee8da0c6043'
    // 'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
  });
  // current_user = new Subject<User>();
  current_user = new BehaviorSubject<User>(null);
  constructor(    private http: HttpClient,
                  private cookieService: CookieService,
                  private router: Router) { }

  loginUser(authData) {
      const body = JSON.stringify(authData);
      return this.http.post(this.baseUrl + 'account/login/', body, {headers: this.headers}).pipe(
        tap(
          (data: User) => {
            console.log(data);
            this.handleAuthentication(data.id, data.username, data.token);
          }
        )
      );
  }

  logout() {

    this.current_user.next(null);
    this.router.navigate(['/auth']);
    this.cookieService.delete('mr-token');
    localStorage.removeItem('current-user');
  }
  handleAuthentication(userId, username, token) {
    const user = new User(userId, username, token);
    this.current_user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      id: number,
      username: string,
      token: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.username,
      userData.token
    );

    if(loadedUser.token){
      this.current_user.next(loadedUser);
    }

  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this.http.post(this.baseUrl + 'account/users/', body, {headers: this.headers}).pipe(
      tap(
        (data: User) => {
          this.handleAuthentication(data.id, data.username, data.token);
        }
      )
    );
  }

  getUser(id) {
    return this.http.get(this.baseUrl + 'account/users/' + id + '/', {headers: this.headers});
  }

  getAuthHeaders() {
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
  getAuthHeadersAndFormData() {
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      Authorization: `Token ${token}`
    });
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
}
