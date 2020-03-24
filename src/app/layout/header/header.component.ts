import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';
import {DynamicScriptLoaderServiceService} from '../../trip/dynamic-script-loader-service.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  registedMode;
  isAuthenticated = false;
  userSub: Subscription;
  username = '';
  // avatar  = "http://127.0.0.1:8000/media/images/41060515.jpg";
  avatar: string;
  User: User;
  Hidden = false;

  constructor(private authService: AuthService,
              private cdRef: ChangeDetectorRef,
              private dynamicScriptLoader: DynamicScriptLoaderServiceService) {
    // this.isAuthenticated =  this.apiService.check_user_exists();


    // this.userSub = this.authService.current_user.subscribe(
    //   (user) => {
    //     this.isAuthenticated = !!user;
    //     if (this.isAuthenticated === true) {
    //       // this.username = user.username;
    //       this.User = user;
    //       // this.avatar = user.avatar;
    //       this.avatar = user.avatar;
    //       // document.getElementById('avatar').src = user.avatar;
    //       // $('#avatar').attr('src', user.avatar);
    //       console.log(this.User);
    //     }
    //
    //     console.log(!user);
    //     console.log(!!user);
    //   }
    // );

  }

  ngOnInit() {

    this.userSub = this.authService.current_user.subscribe(
      (user) => {
        this.isAuthenticated = !!user;
        if (this.isAuthenticated === true) {
          // this.username = user.username;
          this.User = user;
          // this.avatar = user.avatar;
          this.avatar = user.avatar;
          // document.getElementById('avatar').src = user.avatar;
          // $('#avatar').attr('src', user.avatar);
          console.log(this.User);
        }

        console.log(!user);
        console.log(!!user);
      }
    );

    // console.log(this.User);


  }

  // checkDisplay(){
  //   if(this.User.profile.is_admin == false){
  //     return false;
  //   }else if(this.isAuthenticated){
  //     return true;
  //   }else{
  //     return true;
  //   }
  // }

  // checkDisplay(hidden) {
  //   if (hidden == true) {
  //     this.Hidden = true;
  //   }
  // }

//   ngAfterViewChecked() {
//
//
//     this.userSub = this.authService.current_user.subscribe(
//       (user: User) => {
//         this.isAuthenticated = !!user;
//         if (this.isAuthenticated) {
//           this.username = user.username;
//           this.User = user;
//           this.cdRef.detectChanges();
//           console.log(this.User);
//         }
//
//         console.log(!user);
//         console.log(!!user);
//       }
//     );
//
//
//
// }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


}
