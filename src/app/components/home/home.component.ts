import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  pnr: string = '';  // ✅ PNR Search Field

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.source || !this.destination || !this.date) {
      alert('Please fill in all fields');
      return;
    }

    this.router.navigate(['/trains'], {
      queryParams: { source: this.source, destination: this.destination, date: this.date }
    });
  }

  searchByPNR() {  // ✅ PNR Search Function
    if (!this.pnr) {
      alert('Enter a PNR number');
      return;
    }

    this.http.get(`http://localhost:5186/api/bookingprocess/get-ticket/${this.pnr}`).subscribe({
      next: (ticket) => {
        localStorage.setItem('ticket', JSON.stringify(ticket));
        this.router.navigate(['/ticket-details']);
      },
      error: (err) => {
        alert('Ticket not found. Please check the PNR and try again.');
      }
    });
  }
}
