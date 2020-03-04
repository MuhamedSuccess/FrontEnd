import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(   private authservice: AuthService,
                 private cookieService: CookieService,
                 private router: Router) { }

  ngOnInit() {
    this.logout();
  }

  logout() {

  this.authservice.logout();
  }


}
