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

const routes: Routes = [
  {path: '', pathMatch: 'full', component: TripComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AuthModule,
    TripModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
