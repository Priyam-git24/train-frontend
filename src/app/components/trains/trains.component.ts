import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Train {
  trainNo: string;
  trainName: string;
  trainTime: string;
  distance: number;
  seatsArray: number[];
}

@Component({
  selector: 'app-trains',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {
  trains: Train[] = [];
  selectedSeats: { [trainNo: string]: { [quota: number]: boolean } } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const storedTrains = localStorage.getItem('trains');
    this.trains = storedTrains ? JSON.parse(storedTrains) : [];

    // Initialize seat selection state
    this.trains.forEach(train => {
      if (!this.selectedSeats[train.trainNo]) {
        this.selectedSeats[train.trainNo] = {};
      }
    });
  }

  toggleSeat(trainNo: string, quota: number) {
    if (!this.selectedSeats[trainNo]) {
      this.selectedSeats[trainNo] = {};
    }
    this.selectedSeats[trainNo][quota] = !this.selectedSeats[trainNo][quota];
  }

  bookTickets(train: any) {
    const selectedQuotas = Object.keys(this.selectedSeats[train.trainNo])
      .filter(quota => this.selectedSeats[train.trainNo][parseInt(quota, 10)]);
  
    if (selectedQuotas.length === 0) {
      alert('Please select at least one seat before proceeding.');
      return;
    }
  
    this.router.navigate(['/booking-passenger'], {
      queryParams: {
        trainData: JSON.stringify(train),
        selectedQuotas: JSON.stringify(selectedQuotas)
      }
    });
  }
}  