import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('jwtToken');
    console.log('Unauthorized');
  }

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  register(data: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    this.loggedIn = true;
    const headers = new HttpHeaders({
      Email: email,
      Password: password,
    });

    return this.http.post(`${this.apiUrl}/login`, {}, { headers });
  }
  isLoggedIn() {
    return this.loggedIn;
  }

}
