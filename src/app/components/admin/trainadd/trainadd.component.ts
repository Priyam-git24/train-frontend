import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-train-add',
  standalone: true, // Standalone component
  templateUrl: './trainadd.component.html',
  styleUrls: ['./trainadd.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule] // Import required modules
})
export class TrainAddComponent {
  trainForm: FormGroup;
  message = '';

  private apiUrl = 'http://localhost:5212/api/TrainProcess/add-train'; // Adjust as needed

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.trainForm = this.fb.group({
      trainNo: ['', Validators.required],
      trainName: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      totalSeats: [0, [Validators.required, Validators.min(1)]]
    });
  }

  addTrain() {
    if (this.trainForm.valid) {
      this.http.post(this.apiUrl, this.trainForm.value, { responseType: 'text' }).subscribe({
        next: (res) => {
          this.message = 'Train added successfully!';
          this.trainForm.reset();
        },
        error: (err) => {
          this.message = 'Failed to add train: ' + err.error;
        }
      });
    }
  }
}
