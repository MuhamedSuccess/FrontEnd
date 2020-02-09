import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import {RouterModule, Routes} from '@angular/router';
import {ApiService} from '../api.service';
import {SubheaderComponent} from '../layout/subheader/subheader.component';
import {FeaturesComponent} from '../layout/features/features.component';
import {PopularDestinationComponent} from '../layout/popular-destination/popular-destination.component';
import {TestimonialComponent} from '../layout/testimonial/testimonial.component';

const routes: Routes = [
  {path: 'trips', component: TripComponent}
];


@NgModule({
  declarations: [
    TripComponent,
    SubheaderComponent,
    FeaturesComponent,
    PopularDestinationComponent,
    TestimonialComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ], exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class TripModule { }
