import { CommonModule } from '@angular/common';
import { Component,ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // Optional: Use if you want to apply global styles
})
export class AppComponent {
  title = 'ecom';
  cart = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Example: replace layout for /fullscreen-page
      this.cart = event.url === '/cart';
    });
  }
 handleSearch() {
      console.log("Searching for: " );
    }
}
