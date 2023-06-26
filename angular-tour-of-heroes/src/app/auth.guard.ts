import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
      private router: Router,
      private authService: AuthService,
    ) {}

    // If user is authenticated they will be allowed to pass
    // else it will save the requested url, redirect to loginopen a login popup
    // and after successful login redirect them to requested url
    //IMPORTANT:
    //route: ActivatedRouteSnapshot is not used BUT NEEDED to access queryParams
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const authenticated = this.authService.isAuthenticated();
      if (authenticated === true) {
        return true;
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
      
    }
}