import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // Use `styleUrls` instead of `styleUrl`
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null; // Added for better error handling

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    });
  }

  // Getter for easy access to form controls
  get formControls() {
    return this.registerForm.controls;
  }

  // Handle user registration
  onRegister(): void {
    this.submitted = true;
    this.errorMessage = null; // Reset error message on new submission

    // Return early if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const formData = this.registerForm.value;

    this.authService.register(formData).subscribe({
      next: (response) => this.handleRegistrationSuccess(response),
      error: (error) => this.handleRegistrationError(error),
    });
  }

  // Handle successful registration
  private handleRegistrationSuccess(response: any): void {
    console.log('Registration successful:', response.message);
    this.router.navigate(['/login']); // Navigate to login page after successful registration
  }

  // Handle registration error
  private handleRegistrationError(error: any): void {
    if (error.status === 400 && error.error.message) {
      this.errorMessage = error.error.message; // Display specific error message from the server
    } else {
      console.error('Registration failed:', error);
      this.errorMessage = 'An unexpected error occurred. Please try again later.';
    }
  }
}
