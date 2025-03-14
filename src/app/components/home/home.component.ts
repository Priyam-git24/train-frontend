import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import this
import { TrainService } from '../../services/train.service';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule] // ✅ Add FormsModule here
})
export class HomeComponent {
  source: string = '';
  destination: string = '';
  date: string = '';

  constructor(private trainService: TrainService, private router: Router) {}

  onSubmit() {
    if (!this.source || !this.destination || !this.date) {
      alert('Please fill in all fields');
      return;
    }

    this.trainService.getTrains(this.source, this.destination, this.date).subscribe(
      (trains) => {
        if (trains && trains.length > 0) {
          localStorage.setItem('trains', JSON.stringify(trains));
          this.router.navigate(['/trains']);
        } else {
          alert('No trains found.');
        }
      },
      (error) => {
        console.error('Error fetching trains:', error);
        alert('Error fetching trains. Check console.');
      }
    );
  }
}
