import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  source: string = '';
  destination: string = '';
  date: string = '';
  pnr: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Function to Search Trains by Source, Destination & Date
  onSubmit() {
    if (!this.source || !this.destination || !this.date) {
      alert('Please fill in all fields');
      return;
    }

    console.log(`Searching trains from ${this.source} to ${this.destination} on ${this.date}`);

    this.http.get(`http://localhost:5212/api/trainprocess/search-train/${this.source}/${this.destination}/${this.date}`)
      .subscribe({
        next: (trains) => {
          console.log('Train Data:', trains); // ✅ Debugging Log
          if (Array.isArray(trains) && trains.length > 0) {
            localStorage.setItem('trains', JSON.stringify(trains));
            this.router.navigate(['/trains']);
          } else {
            alert('No trains found for the given route and date.');
          }
        },
        error: (err) => {
          console.error('Error fetching trains:', err);
          alert('Failed to fetch trains. Please try again.');
        }
      });
  }

  // ✅ Function to Search Ticket by PNR
  searchByPNR() {
    if (!this.pnr) {
      alert('Enter a PNR number');
      return;
    }

    console.log(`Searching ticket for PNR: ${this.pnr}`);

    this.http.get(`http://localhost:5186/api/bookingprocess/get-ticket/${this.pnr}`)
      .subscribe({
        next: (ticket) => {
          console.log('Ticket Data:', ticket); // ✅ Debugging Log
          localStorage.setItem('ticket', JSON.stringify(ticket));
          this.router.navigate(['/ticket-details']);
        },
        error: (err) => {
          console.error('Error fetching ticket:', err);
          alert('Ticket not found. Please check the PNR and try again.');
        }
      });
  }
}
