import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css'], // Corrected property name from `styleUrl` to `styleUrls`
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    });
  }

  // Getter for easy access to form controls
  get controls() {
    return this.loginForm.controls;
  }

  // Handle user login
  login(): void {
    this.submitted = true;
    this.errorMessage = null;

    // Return early if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => this.handleLoginSuccess(response, email),
      error: (error) => this.handleLoginError(error),
    });
  }

  // Handle successful login
  private handleLoginSuccess(response: any, email: string): void {
    alert('Login successful!');
    console.log('JWT Token:', response.token);
    localStorage.setItem('auth_token', response.token);
    this.router.navigate(['/profile', email]);
  }

  // Handle login error private
  handleLoginError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Invalid email or password.';
    } else {
      console.error('Login failed:', error);
      this.errorMessage = 'An unexpected error occurred.';
    }
  }
}
