import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-passenger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookingpassenger.component.html',
  styleUrls: ['./bookingpassenger.component.css']
})
export class BookingPassengerComponent implements OnInit {
  train: any;
  classType: string = 'General';
  quotaType: string = 'General';
  noOfPassengers: number = 1;
  passengers: any[] = [];
  ticketNo: string | null = null;
  apiResponse: string | null = null;
  fare: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['trainData']) {
        this.train = JSON.parse(params['trainData']);
      }
      this.classType = params['classType'] || 'General';
      this.quotaType = params['quotaType'] || 'General';
      this.fare = +params['fare'] || 1000;
      this.noOfPassengers = Number(params['noOfPassengers']) || 1;
    });

    this.updatePassengerCount(this.noOfPassengers);
  }

  updatePassengerCount(count: number) {
    this.passengers = Array.from({ length: count }, () => ({ passengername: '', age: null, gender: 'M' }));
  }

  bookTickets() {
    if (!this.train) {
      this.apiResponse = "❌ No train data available.";
      return;
    }

    const scheduleId = 1;
    const url = `http://localhost:5212/api/trainprocess/update-seat/${scheduleId}/${this.classType}/${this.quotaType}/-${this.noOfPassengers}`;

    this.http.put(url, {}).subscribe({
      next: (response: any) => {
        this.ticketNo = response?.ticketNo || null;
        this.apiResponse = this.ticketNo ? `✅ Booking Successful! Ticket No: ${this.ticketNo}` : "⚠️ No API response received.";
        this.goToPayment();
      },
      error: (error) => {
        this.apiResponse = `❌ Error: ${error.error?.message || 'API request failed.'}`;
      }
    });
  }

  goToPayment() {
    this.router.navigate(['/payment'], {
      queryParams: {
        trainData: JSON.stringify(this.train),
        classType: this.classType,
        quotaType: this.quotaType,
        noOfPassengers: this.noOfPassengers,
        fare: this.fare,
        ticketNo: this.ticketNo,
        passengers: JSON.stringify(this.passengers)
      }
    });
  }

  closePopup() {
    this.apiResponse = null;
    this.ticketNo = null;
  }
}
