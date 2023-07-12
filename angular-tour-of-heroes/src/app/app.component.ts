import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable, map } from 'rxjs';

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

  ) {}
  
  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
}
