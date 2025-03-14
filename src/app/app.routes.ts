import { TrainsComponent } from './components/trains/trains.component';
import { HomeComponent } from './components/home/home.component';
import { BookingPassengerComponent } from './components/bookingpassenger/bookingpassenger.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trains', component: TrainsComponent },
  { path: 'booking-passenger', component: BookingPassengerComponent },
];
