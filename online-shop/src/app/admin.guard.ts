import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
