import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { SnackBarService } from '../services/snack-bar.service';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { MockProductService } from '../services/mocks/mock-product-service';
import { MockAuthService } from '../services/mocks/mock-auth-service';
import { Observable, of } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

describe('ProductDetailsComponent', () => {
    let component: ProductDetailsComponent;
    let fixture: ComponentFixture<ProductDetailsComponent>;
    let cartService: CartService;
    let snackBarService: SnackBarService;
    let authService: AuthService;
    let dialogService: DialogService;
    let matDialogRefMock: any;
    let productService: ProductService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductDetailsComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
            providers: [
                {
                    provide: ProductService,
                    useClass: MockProductService
                },

                {
                    provide: AuthService,
                    useClass: MockAuthService
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        cartService = TestBed.get(CartService);
        snackBarService = TestBed.get(SnackBarService);
        authService = TestBed.get(AuthService);
        dialogService = TestBed.get(DialogService);
        productService = TestBed.get(ProductService);
        matDialogRefMock = TestBed.get(MatDialog);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have a title 'Online-Shop'`, () => {
        const fixture = TestBed.createComponent(ProductDetailsComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Online-Shop');
    });

    it('should add product to cart when addProductToCart button is clicked', () => {
        const spyOnComponent = spyOn(component, 'addProductToCart').and.callThrough();
        const spyOnCartService = spyOn(cartService, 'addProductToCart');
        const spyOnSnackBarService = spyOn(snackBarService, 'openSnackBarForAddingProductToCart');
        const button = fixture.debugElement.query(By.css('.add-product-to-cart-btn')).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(spyOnComponent).toHaveBeenCalled();
        expect(spyOnCartService).toHaveBeenCalled();
        expect(spyOnSnackBarService).toHaveBeenCalled();
    });

    it('should open a confirm dialog for deleting a product', () => {
        const spyOnComponent = spyOn(component, 'deleteProduct').and.callThrough();
        const spyOnDialogService = spyOn(dialogService, 'openDialogForConfirmDelete');
        const button = fixture.debugElement.query(By.css('.delete-product-btn')).nativeElement;
        button.click();
        fixture.detectChanges();
        expect(spyOnComponent).toHaveBeenCalled();
        expect(spyOnDialogService).toHaveBeenCalled();
        expect(component.deleteProduct).toHaveBeenCalled();
    });

    it('should verify if the user has permision to delete or edit a product', () => {
        const spyOnAuthService = spyOn(authService, 'isAuthorised');
        fixture.detectChanges();
        expect(spyOnAuthService).toHaveBeenCalled();
    });

    it('should open a dialog for editing a product', fakeAsync(() => {
        const spyOnComponent = spyOn(component, 'editProduct').and.callThrough();
        const button = fixture.debugElement.query(By.css('.edit-btn')).nativeElement;
        button.click();
        tick();
        fixture.detectChanges();
        expect(spyOnComponent).toHaveBeenCalled();
        expect(component.editProduct).toHaveBeenCalled();
    }));

    it('should confirm and delete product', fakeAsync(() => {
        const spyOnDialogService = spyOn(matDialogRefMock, 'open').and.returnValue({
            afterClosed: (): Observable<any> => of('Product deleted')
        });
        const spyOnComponent = spyOn(component, 'deleteProduct').and.callThrough();
        const spyOnProductService = spyOn(productService, 'deletProductById').and.callThrough();
        const spyOnSnackBarService = spyOn(snackBarService, 'openSnackBar');
        const button = fixture.debugElement.query(By.css('.delete-product-btn')).nativeElement;
        button.click();
        tick();
        fixture.detectChanges();
        expect(spyOnProductService).toHaveBeenCalled();
        expect(spyOnSnackBarService).toHaveBeenCalled();
        expect(spyOnComponent).toHaveBeenCalled();
        expect(spyOnDialogService).toHaveBeenCalled();
    }));

    it('should not delete product if not confirmed', fakeAsync(() => {
        const spyOnDialogService = spyOn(matDialogRefMock, 'close').and.returnValue({
            afterClosed: (): Observable<any> => of('Dialog Closed')
        });
        const spyOnComponent = spyOn(component, 'deleteProduct').and.callThrough();
        const button = fixture.debugElement.query(By.css('.delete-product-btn')).nativeElement;
        button.click();
        tick();
        fixture.detectChanges();
        expect(spyOnComponent).toHaveBeenCalled();
        expect(spyOnDialogService).toHaveBeenCalled();
    }));
});
