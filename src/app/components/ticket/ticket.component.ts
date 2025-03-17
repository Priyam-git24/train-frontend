import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['bookingData']) {
        this.ticketData = JSON.parse(params['bookingData']);
        console.log("📢 Full API Response:", this.ticketData);

        if (!this.ticketData.passengers || this.ticketData.passengers.length === 0) {
          console.warn("⚠️ No passengers received in API response!");
        }
      }
    });
  }
}
