import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import {AuthModule} from './auth/auth.module';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { TripComponent } from './trip/trip.component';
import {TripModule} from './trip/trip.module';
import {ProfileComponent} from './profile/profile.component';
import { UserModule } from './user/user.module';
import {HeaderComponent} from './layout/header/header.component';
import {ProfileModule} from './profile/profile.module';
import {FooterComponent} from "./layout/footer/footer.component";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SubheaderComponent } from './layout/subheader/subheader.component';
import { FeaturesComponent } from './layout/features/features.component';
import { PopularDestinationComponent } from './layout/popular-destination/popular-destination.component';
import { TestimonialComponent } from './layout/testimonial/testimonial.component';



const routes: Routes = [
  {path: '', pathMatch: 'full', component: TripComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ProfileModule,
    AuthModule,
    TripModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes),
  ],
   exports: [
    RouterModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
