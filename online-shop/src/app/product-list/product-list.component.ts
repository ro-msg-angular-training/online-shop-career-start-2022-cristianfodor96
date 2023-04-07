import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../services/auth.service';
import { Role } from 'src/user-details';
import { SnackBarService } from '../services/snack-bar.service';
import { SnackBarsTexts } from 'src/snack-bars-texts';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private productService: ProductService,
        private dialogService: DialogService,
        private authService: AuthService,
        private snackBarService: SnackBarService
    ) {}

    products: Product[] = [];
    subscription = new Subscription();
    admin: Role[] = [Role.ADMIN];

    ngOnInit(): void {
        this.subscription.add(
            this.productService.getAllProducts().subscribe((products: Product[]) => {
                this.products = products;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    navigateToProductById(id: number): void {
        this.router.navigateByUrl(`product/${id}`);
    }

    navigateToShoppingCart(): void {
        this.router.navigate(['cart']);
    }

    displayedColumns: string[] = [
        'name',
        'description',
        'price',
        'weight',
        'supplier',
        'product-category',
        'product-details'
    ];
    dataSource = this.products;

    addNewProduct(): void {
        this.dialogService
            .openDialogForAddProduct()
            .afterClosed()
            .subscribe(product => {
                if (product) {
                    this.productService.addNewProduct(product).subscribe(newProduct => {
                        product = newProduct;
                    });
                }
            });
    }

    canEdit(): boolean {
        return this.authService.isAuthorised(this.admin);
    }

    logOut(): void {
        this.snackBarService.openSnackBar(SnackBarsTexts.LOGGED_OUT);
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
