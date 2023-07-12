import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    
    ) {}

  // Logs out user and removes loggedIn Item
  logout(): void {
    const currentUrl = window.location.pathname;  
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('loggedIn');
      this.router.navigate(['/accounts/login'], { queryParams: { returnUrl: currentUrl } });
    });
  }
  

}
