import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  
  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
  
  // Logs out user and removes loggedIn Item
  logout(): void {
    const currentUrl = window.location.pathname;
    this.authService.logout();
    localStorage.removeItem('loggedIn')
    this.router.navigate(['/accounts/login'], { queryParams: { returnUrl: currentUrl } });
    
  }
}
