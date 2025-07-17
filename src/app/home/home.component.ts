import { Component } from '@angular/core';
import { selectToken } from '../auth/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  token: string | null = null;

  constructor(private store: Store) {
    this.store.select(selectToken).subscribe(token => {
      this.token = token;
    });
  }
}
