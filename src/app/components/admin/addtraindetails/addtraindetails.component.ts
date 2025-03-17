import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addtraindetails',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Added FormsModule
  templateUrl: './addtraindetails.component.html',
  styleUrls: ['./addtraindetails.component.css']
})
export class AddtraindetailsComponent {
  trainDetails = {
    trainno: '',
    trainname: '',
    traintime: '',
    traveldate: '',
    seatsarray: Array(12).fill(0) // ✅ Initialize with 12 default values (0)
  };

  constructor(private http: HttpClient) {}

  addTrain() {
    const requestData = {
      trainno: String(this.trainDetails.trainno),
      trainname: this.trainDetails.trainname,
      traintime: this.trainDetails.traintime,
      traveldate: this.trainDetails.traveldate,
      seatsarray: this.trainDetails.seatsarray.map(seat => Number(seat) || 0) // ✅ Convert to numbers
    };

    console.log("🚀 Sending Data:", requestData); // ✅ Debug log

    this.http.post('http://localhost:5212/api/trainprocess/add-train-details', requestData).subscribe({
      next: () => alert('Train details added successfully!'),
      error: (err: any) => {
        console.error("❌ Error Response:", err);
        alert('Error adding train details: ' + err.message);
      }
    });
  }
}
