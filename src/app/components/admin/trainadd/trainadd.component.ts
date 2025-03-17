import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trainadd',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trainadd.component.html',
  styleUrls: ['./trainadd.component.css']
})
export class TrainaddComponent {
  trainForm: FormGroup;
  routeForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Train Form
    this.trainForm = this.fb.group({
      trainNo: ['', Validators.required],
      trainName: ['', Validators.required],
    });

    // Route Form
    this.routeForm = this.fb.group({
      sourceStation: ['', Validators.required],
      destinationStation: ['', Validators.required],
      distance: [0, [Validators.required, Validators.min(1)]],
      isActive: [true, Validators.required] 
    });
  }

  addTrain() {
    const trainData = this.trainForm.value;
    this.http.post('http://localhost:5212/api/trainprocess/add-train', trainData).subscribe(
      (response) => {
        console.log('Train Added:', response);
        this.trainForm.reset();
      },
      (error) => console.error('Error adding train:', error)
    );
  }

  addRoute() {
    const routeData = {
      SourceStation: this.routeForm.value.sourceStation,
      DestinationStation: this.routeForm.value.destinationStation,
      Distance: Number(this.routeForm.value.distance),
      isActive: Boolean(this.routeForm.value.isActive)  
    };

    console.log('Sending Route Data:', routeData); 

    this.http.post('http://localhost:5212/api/trainprocess/add-route', routeData).subscribe(
      (response) => {
        console.log('Route Added:', response);
        this.routeForm.reset();
        this.routeForm.patchValue({ isActive: true });
      },
      (error) => {
        console.error('Error adding route:', error);
        if (error.error) {
          console.error('API Response:', JSON.stringify(error.error, null, 2));
        }
      }
    );
  }
}
