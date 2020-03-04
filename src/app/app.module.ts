import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CookieService} from 'ngx-cookie-service';
import {AuthModule} from './auth/auth.module';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from './user/user.module';
import {HeaderComponent} from './layout/header/header.component';
import {ProfileModule} from './profile/profile.module';
import {FooterComponent} from './layout/footer/footer.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {LayoutModule} from './layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ProfileModule,
    SharedModule,
    LayoutModule,
    UserModule,
    NgxDaterangepickerMd.forRoot(),
    AngularFontAwesomeModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    SharedModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
