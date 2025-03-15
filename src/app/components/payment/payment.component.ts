import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  train: any;
  classType: string = 'AC';
  quotaType: string = 'General';
  noOfPassengers: number = 1;
  fare: number = 1000;
  apiResponse: string | null = null;
  ticketNo: string | null = null;
  passengers: any[] = [];

  userId: number = 1;
  scheduleId: number = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['trainData']) {
        this.train = JSON.parse(params['trainData']);
      }
      this.classType = params['classType'] || 'AC';
      this.quotaType = params['quotaType'] || 'General';
      this.noOfPassengers = Number(params['noOfPassengers']) || 1;
      this.fare = Number(params['fare']) || 0;
      this.ticketNo = params['ticketNo'] || null;

      if (params['passengers']) {
        this.passengers = JSON.parse(params['passengers']);
      }

      console.log("📢 Payment Details:", {
        train: this.train,
        classType: this.classType,
        quotaType: this.quotaType,
        noOfPassengers: this.noOfPassengers,
        fare: this.fare,
        passengers: this.passengers
      });
    });
  }

  makePayment() {
    console.log("✅ Proceeding with dummy payment...");

    const bookingData = {
      userid: this.userId,
      scheduleid: this.scheduleId,
      classname: this.classType,
      quotaname: this.quotaType,
      fare: this.fare,
      noofpassengers: this.noOfPassengers,
      passengers: this.passengers.map(p => ({
        passengername: p.passengername || p.name,
        age: p.age,
        gender: p.gender,
        isactive: true
      }))
    };

    console.log("📢 Sending Booking Request:", bookingData);

    this.http.post("http://localhost:5186/api/bookingprocess/add-booking", bookingData).subscribe({
      next: (response: any) => {
        console.log("✅ Payment Success:", response);
        this.router.navigate(['/ticket'], {
          queryParams: {
            bookingData: JSON.stringify(response)
          }
        });
      },
      error: (error) => {
        console.error("❌ API Error:", error);
        this.apiResponse = `❌ Payment failed. ${error.error?.message || 'Unknown error'}`;
      }
    });
  }
}
