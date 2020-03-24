import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {Subscription} from 'rxjs';
import {ProfileService} from '../../profile/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  User = {};
   userSub: Subscription;
  userTypes = [
    {name: 'tourist', value: 'tourist'},
    {name: 'guide', value: 'guide'},
  ];
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    // userType: new FormControl(this.userTypes[0])
  });

  formData = {};
  @Output() registerMode = new EventEmitter();

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      this.router.navigate(['/trips']);
    }
  }

  loginForm() {

    this.loginUser();

  }


  loginUser() {

    const data = {
      username: this.authForm.value.username,
      password: this.authForm.value.password
    };
    console.log(data);
    this.authService.loginUser(data).subscribe(
      result => {
        // console.log(this.authForm.value);
        // console.log('User: ' + JSON.stringify(result));
        // this.loadLocalUser(result.id);

        const user: string = JSON.stringify(result);
        // this.getUser(JSON.parse(user).id);

        this.cookieService.set('mr-token', JSON.parse(user).token);
        this.registerMode.emit(true);

        // this.updateProfile(result.id);

        // console.log(result.id);

        // this.router.navigate(['/trips']);
        // this.navigateUser();
        // window.location.reload();
      },
      error => console.log(error)
    );
  }

  updateProfile(id) {


    this.authService.getUser(id).subscribe(
      (user: any) => {
        // this.User = user;
        this.appyUpdate(user.profile, user.id);

      },
      error => {
        console.log(error);
      }
    );


  }

  appyUpdate(profile, id) {

    //  const profileData = {
    //   last_login: Date.now()
    // };

     profile.last_login = Date.now();
     this.profileService.updateProfile(profile, id).subscribe(
        data => {console.log(data); },
            error => {console.log(error); }
    );
  }
 navigateUser() {
    this.authService.current_user.subscribe(
      (user: any) => {
        if (user.profile.is_admin == true) {
          console.log(true);
          this.router.navigate(['/admin']);
        } else if (user.profile.is_guide == true) {
          // navigate him to guide profile

        } else {
          this.router.navigate(['/trips']);
        }
      }
    );
  }

  getUser(id) {
    this.authService.getUser(id).subscribe(
      (user: User) => {
        // this.User = user;
        localStorage.setItem('current-user', JSON.stringify(user));
      },
      error => {
        console.log(error);
      }
    );
  }

  loadLocalUser(id) {
    // this.authService.loadLocalUser();
    this.userSub =  this.authService.loadLocalUser(id).subscribe(
      user => {
        console.log(user);
    }
    );

  }

}
