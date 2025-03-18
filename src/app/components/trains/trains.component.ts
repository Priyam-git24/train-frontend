import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Train {
  trainNo: string;
  trainName: string;
  trainTime: string;
  distance: number;
}

interface Quota {
  QuotaId: number;
  QuotaType: string;
  IsActive: number;
}

interface ClassType {
  ClassId: number;
  ClassType: string;
  IsActive: number;
}

@Component({
  selector: 'app-trains',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {
  trains: Train[] = [];
  quotaTypes: Quota[] = [
    { QuotaId: 1, QuotaType: 'women', IsActive: 1 },
    { QuotaId: 2, QuotaType: 'Senior citizen', IsActive: 1 },
    { QuotaId: 3, QuotaType: 'General', IsActive: 1 }
  ];
  classTypes: ClassType[] = [
    { ClassId: 1, ClassType: 'AC-2', IsActive: 1 },
    { ClassId: 2, ClassType: 'AC-3', IsActive: 1 },
    { ClassId: 3, ClassType: 'Sleeper', IsActive: 1 },
    { ClassId: 4, ClassType: 'General', IsActive: 1 }
  ];

  selectedClass: { [trainNo: string]: string } = {};
  selectedQuota: { [trainNo: string]: string } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const storedTrains = localStorage.getItem('trains');
    this.trains = storedTrains ? JSON.parse(storedTrains) : [];

    this.trains.forEach(train => {
      this.selectedClass[train.trainNo] = 'General'; // Default selection
      this.selectedQuota[train.trainNo] = 'General';
    });
  }

  bookTickets(train: Train) {
    const classType = this.selectedClass[train.trainNo];
    const quotaType = this.selectedQuota[train.trainNo];

    if (!classType || !quotaType) {
      alert('Please select both class and quota before proceeding.');
      return;
    }

    this.router.navigate(['/booking-passenger'], {
      queryParams: {
        trainData: JSON.stringify(train),
        classType: classType,
        quotaType: quotaType
      }
    });
  }
}