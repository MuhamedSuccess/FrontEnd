import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../models/User';
import {AuthService} from '../auth.service';
import {ProfileService} from "../../profile/profile.service";
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userTypes = [
    {name: 'tourist', value: 'tourist'},
    {name: 'guide', value: 'guide'},
  ];

  formData = {};
  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    email: new FormControl(''),
    userType: new FormControl(this.userTypes[0]),
  });


  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit() {
  }


  registerUser() {
    // console.log(this.authForm.value);

    if (this.registerForm.value.password === this.registerForm.value.passwordConfirm) {
      if (this.registerForm.value.userType === 'tourist') {
        this.formData = {
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          is_tourist: true,
          first_name: 'd',
          last_name: 'd',
          sex: 'M'
        };
      } else {
        this.formData = {
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          is_guide: true,
          first_name: 'd',
          last_name: 'd',
          sex: 'M'
        };
      }
    }


    console.log(this.formData);

    this.authService.registerUser(this.formData).subscribe(
      (user: User) => {
        this.updateProfile(user.id, this.formData);
        localStorage.setItem('user-session', JSON.stringify(user));
        console.log(user);
        this.logUserFromRegister();
      },
      error => console.log(error)
    );
  }

  updateProfile(id, data) {
    this.profileService.updateProfile(data, id).subscribe(
      result => {
        console.log(result);
      },
      error => console.log(error)
    );
  }

  logUserFromRegister() {
    const data = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    console.log(data);
    this.authService.loginUser(data).subscribe(
      result => {
        // console.log(this.authForm.value);
        console.log('User: ' + JSON.stringify(result));
        const user: string = JSON.stringify(result);
        localStorage.setItem('current-user', user);
        this.cookieService.set('mr-token', JSON.parse(user).token);
        this.router.navigate(['/trips']);
      },
      error => console.log(error)
    );
  }


}
