import { TrainsComponent } from './components/trains/trains.component';
import { HomeComponent } from './components/home/home.component';
import { BookingPassengerComponent } from './components/bookingpassenger/bookingpassenger.component';
import { Routes } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { TicketComponent } from './components/ticket/ticket.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trains', component: TrainsComponent },
  { path: 'booking-passenger', component: BookingPassengerComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'ticket', component: TicketComponent },
];
