import { Injectable } from '@angular/core';
import { Supplier } from 'src/supplier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendURL } from 'src/utils';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    constructor(private http: HttpClient) {}

    supplier!: Supplier;

    getAllSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(backendURL + 'suppliers');
    }
}
