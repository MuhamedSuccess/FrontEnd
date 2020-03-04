import {RouterModule, Routes} from '@angular/router';
import {TripComponent} from './trip.component';
import {TripCreateComponent} from './trip-create/trip-create.component';
import {NgModule} from '@angular/core';
import {TripStartComponent} from './trip-start/trip-start.component';

const routes: Routes = [
  {
    path: '', component: TripComponent,
    children: [
      {path: '', component: TripStartComponent},
      {path: 'create', component: TripCreateComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
