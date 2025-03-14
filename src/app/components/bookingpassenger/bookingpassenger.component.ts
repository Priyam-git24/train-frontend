import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-passenger',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Added CommonModule & FormsModule
  templateUrl: './bookingpassenger.component.html',
  styleUrls: ['./bookingpassenger.component.css']
})
export class BookingPassengerComponent implements OnInit {
  train: any;
  selectedQuotas: number[] = [];
  passengers: any[] = [];
  noOfPassengers: number = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['trainData']) {
        this.train = JSON.parse(params['trainData']);
      }
      if (params['selectedQuotas']) {
        this.selectedQuotas = JSON.parse(params['selectedQuotas']);
      }
    });

    this.updatePassengerCount(this.noOfPassengers);
  }

  updatePassengerCount(count: number) {
    this.passengers = Array.from({ length: count }, () => ({ name: '', age: '', gender: '' }));
  }

  bookTickets() {
    const bookingData = {
      userId: 1,  // Hardcoded user ID, replace with actual user data if available
      scheduleId: this.train.scheduleId,
      className: this.train.className,
      quotaName: this.selectedQuotas.join(', '),
      seatNo: 1, // You may need logic to determine seat numbers
      noOfPassengers: this.noOfPassengers,
      fare: this.train.fare * this.noOfPassengers,
      passengers: this.passengers
    };

    this.http.post('http://localhost:5271/api/add-booking', bookingData)
      .subscribe(response => {
        alert('Booking successful!');
        this.router.navigate(['/']); // Redirect to homepage or confirmation page
      }, error => {
        console.error('Booking failed', error);
        alert('Booking failed, please try again.');
      });
  }
}
