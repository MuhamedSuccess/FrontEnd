import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User';
import {AuthService} from '../auth.service';
import {ProfileService} from '../../profile/profile.service';
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
  // Password expression. Password must be between 4 and 8 digits long and include at least one numeric digit.

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[^A-Za-z0-9]\n')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*\\d).{4,8}$\n')]),
    passwordConfirm: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
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
      (user: any) => {
        this.updateProfile(user.id, this.formData);
        localStorage.setItem('user-session', JSON.stringify(user));
        console.log(user);
        this.logUserFromRegister();
      },
      (error: any) => {

        const errorMessage = JSON.parse(error);
        if (errorMessage.username) {
          for (const username_error of errorMessage.username) {
            document.getElementById('username_error').innerHTML = username_error + '<br>';
          }
        }
        // } else  if (errorMessage.password) {
        //   for (const pass_error of errorMessage.password) {
        //       document.getElementById('pass1_error').innerHTML = username_error + '<br>';
        //     }
        // }
        // console.log(error);
        // console.log(error.username);
        // if (error.username) {
        //     for (const username_error of error.username) {
        //       document.getElementById('username_error').innerHTML = username_error + '<br>';
        //     }
        //
        //   }


      }
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
        // localStorage.setItem('current-user', user);
        this.cookieService.set('mr-token', JSON.parse(user).token);
        this.router.navigate(['/trips']);
      },
      error => console.log(error)
    );
  }


}
