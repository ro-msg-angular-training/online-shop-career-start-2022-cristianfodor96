import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { backendURL } from 'src/utils';
import { getAllMockProducts, getMockProduct } from './mocks/mock-data-for-products';

describe('ProductService', () => {
    let productService: ProductService;
    let controller: HttpTestingController;
    const expectedProduct = getMockProduct();
    const expectedProducts = getAllMockProducts();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProductService],
            imports: [HttpClientTestingModule]
        });

        productService = TestBed.get(ProductService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(productService).toBeTruthy();
    });

    it('should verify url when getAllProducts is called', () => {
        productService.getAllProducts().subscribe();
        const request = controller.expectOne({ method: 'GET', url: backendURL + 'products' });
        request.flush([expectedProducts]);
        controller.verify();
        expect(expectedProducts).toEqual(expectedProducts);
    });

    it('should verify url when getProductById is called', () => {
        productService.getProductById(expectedProduct.id).subscribe();
        const request = controller.expectOne({ method: 'GET', url: backendURL + 'products/' + expectedProduct.id });
        request.flush([expectedProduct]);
        controller.verify();
        expect(expectedProduct).toEqual(expectedProduct);
    });

    it('should verify url when deletProductById is called', () => {
        productService.deletProductById(expectedProduct.id).subscribe();
        const request = controller.expectOne({
            method: 'DELETE',
            url: backendURL + 'products/' + expectedProduct.id
        });
        request.flush([expectedProduct]);
        controller.verify();
        expect(expectedProduct).toEqual(expectedProduct);
    });

    it('should verify url when editProdut is called', () => {
        productService.editProdut(expectedProduct).subscribe();
        const request = controller.expectOne({
            method: 'PUT',
            url: backendURL + 'products/' + expectedProduct.id
        });
        request.flush([expectedProduct]);
        controller.verify();
        expect(expectedProduct).toEqual(expectedProduct);
    });

    it('should verify url when addNewProduct is called', () => {
        productService.addNewProduct(expectedProduct).subscribe();
        const request = controller.expectOne({
            method: 'POST',
            url: backendURL + 'products'
        });
        request.flush([expectedProduct]);
        controller.verify();
        expect(expectedProduct).toEqual(expectedProduct);
    });
});
