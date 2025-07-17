import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginSuccess, loginFailure } from '../auth/auth.actions';
import { Observable } from 'rxjs';
import { selectError } from '../auth/auth.selectors';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule] // Add ReactiveFormsModule & CommonModule here if needed
})
export class LoginComponent {
  loginForm: FormGroup;
  error$!: Observable<boolean>;

  // ✅ Hardcoded users in this file
  private users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
  ];

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error$ = this.store.select(selectError);
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    const matched = this.users.find(
      u => u.username === username && u.password === password
    );

    if (matched) {
      const token = btoa(`${username}:${password}`); // fake token
      this.store.dispatch(loginSuccess({ token }));
      console.log('Login successful:', matched  ,token);
      // Navigate to home or dashboard
      this.router.navigate(['home']);

    } else {
      this.store.dispatch(loginFailure());
      alert('Invalid username or password');
      console.log('Login failed: Invalid credentials');
    }
  }
}
