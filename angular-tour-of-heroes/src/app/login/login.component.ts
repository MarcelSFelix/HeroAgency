import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent { 

  username: string = '';
  password: string = '';

  @ViewChild('loginPopup') loginPopup: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  // Gets 'username' and 'password' of inputs
  // compares it against credentials
  onSubmit() {
    const username = (<HTMLInputElement>document.getElementsByName('username')[0]).value;
    const password = (<HTMLInputElement>document.getElementsByName('password')[0]).value;
    this.authService.login(username, password).subscribe(
      (response) => {
        // Set marker that user is logged in
        localStorage.setItem('loggedIn', 'true')
        // Redirect the user to previously requested site
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      (error) => {
        // Error handling
        console.error('Login error:', error);
        // Handle the error and display an appropriate message to the user
      }
    );
  }
}