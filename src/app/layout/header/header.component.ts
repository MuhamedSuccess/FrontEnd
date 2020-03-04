import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';
import {DynamicScriptLoaderServiceService} from "../../trip/dynamic-script-loader-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() registedMode;
  isAuthenticated = false;
  userSub: Subscription;
  constructor(private authService: AuthService,
              private dynamicScriptLoader: DynamicScriptLoaderServiceService) {
    // this.isAuthenticated =  this.apiService.check_user_exists();
  }

ngOnInit() {



    this.userSub = this.authService.current_user.subscribe(
      user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      }
    );

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }



}
