import { Observable, of } from 'rxjs';
import { Product } from 'src/product';
import { ProductService } from '../product.service';
import { getAllMockProducts, getMockProduct } from './mock-data-for-products';

export class MockProductService implements Partial<ProductService> {
    deletProductById(id: number): Observable<void> {
        return of();
    }
    editProdut(product: Product): Observable<Product> {
        return of(getMockProduct());
    }
    addNewProduct(product: Product): Observable<Product> {
        return of(getMockProduct());
    }
    getAllProducts(): Observable<Product[]> {
        return of(getAllMockProducts());
    }

    getProductById(id: number): Observable<Product> {
        return of(getMockProduct());
    }
}
