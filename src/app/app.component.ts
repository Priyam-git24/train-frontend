import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ✅ Import RouterOutlet instead of RouterModule
  template: `<router-outlet></router-outlet>`, // ✅ Ensure this is correctly set
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
