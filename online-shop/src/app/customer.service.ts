import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/user-details';
import { backendURL } from 'src/utils';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    addNewCustomer(customer: UserDetails): Observable<UserDetails> {
        return this.http.post<UserDetails>(backendURL + 'customers', customer);
    }
}
