import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {  
  private authUrl = 'api/accounts/'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {} 

  username: string = '';
  password: string = '';

  // Check whether the user is logged in and return
  // true or false
  public isAuthenticated(): boolean {
    const loggedIn = localStorage.getItem('loggedIn');
    return loggedIn === 'true';
  }
  
  // Logs user in by setting 'currentUser' to 'true'
  login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.authUrl}login/`;
    const loginData = { username: username, password: password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.http.post(loginUrl, loginData, this.httpOptions);
  }

  

  logout(): Observable<any> {
    const logoutUrl = `${this.authUrl}logout/`;
    return this.http.post(logoutUrl, {}, this.httpOptions);
  }
}

  
