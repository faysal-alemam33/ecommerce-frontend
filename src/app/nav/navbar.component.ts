import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; // Track login status
  loading = true; // Loading state

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Initialize isLoggedIn based on AuthService
    this.isLoggedIn = this.authService.isLoggedIn();

    // Simulate loading delay
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  login() {
    // Example login credentials (replace with actual user input)
    const email = 'user@example.com';
    const password = 'password';

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoggedIn = this.authService.isLoggedIn(); // Update login status
        this.router.navigate(['/home']); // Redirect to home or another route
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn(); // Update login status
    this.router.navigate(['/login']); // Redirect to login page
  }
}
