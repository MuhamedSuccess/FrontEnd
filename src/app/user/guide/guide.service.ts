import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private authService: AuthService,
              private router: Router) { }

  getAllGuides() {
    return this.http.get(this.authService.baseUrl + 'api/guide/', {headers: this.authService.headers});
  }
}
