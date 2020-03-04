import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AdminComponent} from "./user/admin/admin.component";
import {TripComponent} from "./trip/trip.component";
import {TripStartComponent} from "./trip/trip-start/trip-start.component";
import {TripCreateComponent} from "./trip/trip-create/trip-create.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/trips'},
  {path: 'admin', component: AdminComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'trips', loadChildren: './trip/trip.module#TripModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
