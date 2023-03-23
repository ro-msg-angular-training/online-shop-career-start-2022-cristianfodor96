import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendURL } from 'src/utils';
import { ProductCategory } from 'src/product-category';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    constructor(private http: HttpClient) {}

    productCategory!: ProductCategory;

    getAllProductCategories(): Observable<ProductCategory[]> {
        return this.http.get<ProductCategory[]>(backendURL + 'product-categories');
    }
}
