import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const currentUser = this.authService.currentUserValue;

        if (currentUser) {
            if (route.data['roles'] && route.data['roles'].indexOf(currentUser.roles) === -1) {
                this.router.navigate(['/']);
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
}
