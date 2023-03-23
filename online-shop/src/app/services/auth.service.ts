import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from 'src/user-details';
import { backendURL } from 'src/utils';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Role } from 'src/user-details';
import { LocalStorageKeys } from 'src/local-storage-keys';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<UserDetails>;
    public currentUser: Observable<UserDetails>;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<UserDetails>(
            JSON.parse(localStorage.getItem(LocalStorageKeys.currentUser)!)
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserDetails {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<UserDetails> {
        return this.httpClient.post<UserDetails>(backendURL + 'login', { username, password }).pipe(
            map(user => {
                if (user) {
                    localStorage.setItem(LocalStorageKeys.currentUser, JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            })
        );
    }

    logout(): void {
        localStorage.removeItem(LocalStorageKeys.currentUser);
    }

    public isAuthorised(roles: Role[]): boolean {
        const currentUser = JSON.parse(localStorage.getItem(LocalStorageKeys.currentUser)!);
        if (!currentUser) return false;
        return roles.indexOf(currentUser.roles) >= 0;
    }
}
