import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticket: any = null;
  apiUrl = 'http://localhost:5186/api/bookingprocess'; // Update API URL

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const storedTicket = localStorage.getItem('ticket');
    if (storedTicket) {
      this.ticket = JSON.parse(storedTicket);
    }
  }

  cancelTicket() {
    if (!this.ticket?.pnr) {
      alert('Invalid Ticket');
      return;
    }

    if (!confirm('Are you sure you want to cancel this ticket?')) {
      return;
    }

    this.http.delete(`${this.apiUrl}/cancel-ticket/${this.ticket.pnr}`, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Ticket canceled successfully.');
          localStorage.removeItem('ticket');
          this.router.navigate(['/']); // Redirect to home after cancellation
        },
        error: (err) => {
          console.error('API Error:', err);
          alert(`Failed to cancel ticket. Error: ${err.message}`);
        }
      });
  }
}
