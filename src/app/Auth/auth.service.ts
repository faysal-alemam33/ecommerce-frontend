import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = !!localStorage.getItem('jwtToken'); // Initialize based on token presence

  constructor(private http: HttpClient) {}

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('jwtToken'); // Remove token on logout
    console.log('User logged out');
  }

  register(data: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Email: email,
      Password: password,
    });

    return this.http.post(`${environment.apiUrl}/login`, {}, { headers }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.loggedIn = true;       // Set loggedIn to true only if the response contains a valid token
          localStorage.setItem('jwtToken', response.token); // Store the token in localStorage
          console.log('Login successful');
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
  }
}
