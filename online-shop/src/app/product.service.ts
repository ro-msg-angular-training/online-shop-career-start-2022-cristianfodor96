import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { backendURL } from 'src/utils';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {}

    product!: Product;

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(backendURL + 'products');
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(backendURL + 'products/' + id);
    }

    deletProductById(id: number): Observable<void> {
        return this.http.delete<void>(backendURL + 'products/' + id);
    }

    editProdut(product: Product): Observable<Product> {
        return this.http.put<Product>(backendURL + 'products/' + product.id, product);
    }

    addNewProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(backendURL + 'products', product);
    }
}
