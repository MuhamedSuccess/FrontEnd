import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../auth/auth.service';
import {ProfileService} from '../profile.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {


  User;
  userSub: Subscription;
  avatar = '';
  constructor(private apiService: ApiService,
              private router: Router,
              private cookieService: CookieService,
              private authService: AuthService,
              private profileService: ProfileService) { }

  ngOnInit() {

    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/account']);
    } else {

        this.loadLocalUser();

        if (this.User.avatar) {
        this.avatar = this.User.avatar;
      } else {
        this.avatar = 'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg';
      }
      // console.log(this.User);
    }
  }

  loadLocalUser() {
    // this.authService.loadLocalUser();
    this.userSub = this.authService.current_user.subscribe(
      user => {
        this.User = user;

      }
    );

  }

}
