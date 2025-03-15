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

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['trainData']) {
        this.train = JSON.parse(params['trainData']);
      }
      if (params['classType']) {
        this.classType = params['classType'];
      }
      if (params['quotaType']) {
        this.quotaType = params['quotaType'];
      }
    });

    this.updatePassengerCount(this.noOfPassengers);
  }

  updatePassengerCount(count: number) {
    this.passengers = Array.from({ length: count }, () => ({ name: '', age: null, gender: 'M' }));
  }

  bookTickets() {
    if (!this.train) {
      this.apiResponse = "❌ No train data available.";
      return;
    }

    const scheduleId = 1;
    const passengersToBook = this.noOfPassengers;

    const url = `http://localhost:5212/api/trainprocess/update-seat/${scheduleId}/${this.classType}/${this.quotaType}/-${passengersToBook}`;
    console.log("📡 Sending API request to:", url);
    console.log("🚆 Train Info:", this.train);
    console.log("🎟️ Selected Quota:", this.quotaType);
    console.log("🏷️ Selected Class:", this.classType);

    this.http.put(url, {}).subscribe({
      next: (response: any) => {
        console.log("✅ API Success Response:", response);
        this.ticketNo = response?.ticketNo || null;
        this.apiResponse = this.ticketNo 
          ? `✅ Booking Successful! Ticket No: ${this.ticketNo}`
          : "⚠️ No API response received.";
      },
      error: (error) => {
        console.error("❌ API Error:", error);
        this.apiResponse = `❌ Error: ${error.error?.message || 'API request failed.'}`;
      }
    });
  }

  closePopup() {
    this.apiResponse = null;
    this.ticketNo = null;
  }
}
