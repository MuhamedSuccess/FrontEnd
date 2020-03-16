import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import {RouterModule, Routes} from '@angular/router';
import {ApiService} from '../api.service';
import {SubheaderComponent} from '../layout/subheader/subheader.component';
import {FeaturesComponent} from '../layout/features/features.component';
import {PopularDestinationComponent} from '../layout/popular-destination/popular-destination.component';
import {TestimonialComponent} from '../layout/testimonial/testimonial.component';
import { TripCreateComponent } from './trip-create/trip-create.component';
import {SharedModule} from '../shared/shared.module';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripStartComponent } from './trip-start/trip-start.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {DynamicScriptLoaderServiceService} from './dynamic-script-loader-service.service';
import {TripRoutingModule} from './trip-routing.module';
import { TripDetailsComponent } from './trip-details/trip-details.component';

@NgModule({
  declarations: [
    TripComponent,
    SubheaderComponent,
    FeaturesComponent,
    PopularDestinationComponent,
    TestimonialComponent,
    TripCreateComponent,
    TripListComponent,
    TripStartComponent,
    TripDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TripRoutingModule,
    SharedModule,

  ], exports: [
      RouterModule
  ],
  providers: [
    ApiService,
    DynamicScriptLoaderServiceService
  ]
})
export class TripModule { }
