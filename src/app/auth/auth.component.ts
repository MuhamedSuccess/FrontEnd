import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {User} from '../models/User';
interface TokenObj {
    token: string;
 }

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {



  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router
  ) { }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      this.router.navigate(['/trips']);
    }
  }



}
