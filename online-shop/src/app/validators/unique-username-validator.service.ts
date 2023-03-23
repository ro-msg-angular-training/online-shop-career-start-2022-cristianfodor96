import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';

@Injectable({
    providedIn: 'root'
})
export class UniqueUsernameValidatorService {
    constructor(private customerService: CustomerService) {}

    usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return this.customerService.existsByUsername(control.value).pipe(
                map(res => {
                    return res ? { usernameExists: true } : null;
                })
            );
        };
    }
}
