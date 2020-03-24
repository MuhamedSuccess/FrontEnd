import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../models/User';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  User;
  userSub: Subscription;
  avatar = '';
  selectedFile: File;

  // localUser: JSON;
  genders = [
    {name: 'male', value: 'M'},
    {name: 'female', value: 'F'},
  ];

  updatedUser: User;
  Score = 0;
  formData = {};
  profileForm = new FormGroup({
    username: new FormControl(''),
    avatar: new FormControl(''),
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    city: new FormControl(''),
    birthDate: new FormControl(''),
    is_guide: new FormControl(false),
    is_tourist: new FormControl(false),
    gender: new FormControl(this.genders[0]),
  });


  constructor(private apiService: ApiService,
              private router: Router,
              private cookieService: CookieService,
              private authService: AuthService,
              private profileService: ProfileService
  ) {

    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/account']);
    } else {
      this.loadLocalUser();


    }
  }

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

    // console.log('Current User: ' + this.User);
  }


  loadLocalUser() {
    // this.authService.loadLocalUser();
    this.userSub = this.authService.current_user.subscribe(
      user => {
        this.User = user;

      }
    );

  }

  saveForm() {

    console.log(this.profileForm.value);
    // this.formData = {
    //   username: this.profileForm.value.username,
    //   email: this.profileForm.value.email,
    //   profile: {
    //     first_name: this.profileForm.value.first_name,
    //     last_name: this.profileForm.value.last_name,
    //     birth_date: this.profileForm.value.birthDate,
    //     is_guide: true,
    //     city: this.profileForm.value.city,
    //     sex: this.profileForm.value.gender.value,
    //   },
    //
    // };

    // is_guide: this.profileForm.value.profile.is_guide,
    //   is_tourist: this.profileForm.value.profile.is_tourist,
    console.log(this.formData);
    // however you don not have to send all user's data because of the partial_update
    let userSub: Subscription;
    let profileSub: Subscription;
    let flag = 0;

    userSub = this.apiService.updateProfile({
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
    }, this.User.id).subscribe(
      (result: User) => {
        // this.updatedUser.username = result.username;
        // this.updatedUser.email = result.email;
        console.log(result);
        flag = 1;
        this.Score = 1;
      },
      error => console.log(error)
    );


    const profileData = new FormData();
    profileData.append('first_name', this.profileForm.value.first_name);
    profileData.append('last_name', this.profileForm.value.last_name);
    profileData.append('avatar', this.selectedFile, this.selectedFile.name);
    profileData.append('birth_date', this.profileForm.value.birth_date);
    profileData.append('is_guide', this.profileForm.value.is_guide);
    profileData.append('sex', this.profileForm.value.sex);

    console.log(JSON.stringify(profileData) );

    profileSub = this.profileService.updateUserProfile(profileData, this.User.id).subscribe(
      (result: User) => {
        console.log(result);

        flag = flag + 1;
        this.Score = this.Score + 1;
        this.applyUpdate(result.id);

      },
      error => console.log(error)
    );


    // this.applyUpdate(this.User.id);
    // if (this.Score === 2) {
    //   // this.authService.current_user.next(this.updatedUser);
    //   this.applyUpdate(this.User.id);
    // }


  }



  applyUpdate(id) {

    this.authService.getUser(id).subscribe(
      (data: User) => {
        this.authService.current_user.next(data);
        localStorage.setItem('current-user', JSON.stringify(data));
      }
    );


    // this.userSub = this.authService.loadLocalUser(id).subscribe(
    //   (user: User) => {
    //     console.log(user);
    //     this.authService.current_user.next(user);
    //     console.log(this.authService.current_user);
    //   }
    // );
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
    // this.User.avatar = this.selectedFile.name;

    // if (event.target.files && event.target.files[0]) {
    //         const reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             // this.User.profile.avatar = event.target.result;
    //
    //             console.log(this.User.profile.avatar);
    //         };
    //         reader.readAsDataURL(event.target.files[0]);
    //     }

  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.userSub.unsubscribe();
  }

  // first_name: this.profileForm.value.first_name,
    //   last_name: this.profileForm.value.last_name,
    //   avatar: this.User.profile.avatar,
    //   birth_date: this.profileForm.value.birthDate,
    //   is_guide: true,
    //   city: this.profileForm.value.city,
    //   sex: this.profileForm.value.gender.value,

}
