import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const formData = this.registerForm.value;

    this.authService.register(formData).subscribe({
      next: (response) => {
        alert(response.message);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 400 && error.error.message) {
          alert(error.error.message);
        } else {
          console.error('Registration failed:', error);
          alert('An unexpected error occurred.');
        }
      }
    });
  }

}
