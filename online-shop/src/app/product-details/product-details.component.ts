import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { DialogService } from '../services/dialog.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from 'src/user-details';
import { Observable } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { SnackBarsTexts } from 'src/snack-bars-texts';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    title = 'Online-Shop';
    id!: number;
    roles: Role[] = [Role.ADMIN];
    product$!: Observable<Product>;
    canEdit!: boolean;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private dialogService: DialogService,
        private router: Router,
        private authService: AuthService,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
        this.product$ = this.productService.getProductById(this.id);
        this.canEdit = this.authService.isAuthorised(this.roles);
    }

    deleteProduct(): void {
        this.dialogService
            .openDialogForConfirmDelete()
            .afterClosed()
            .subscribe(
                res => {
                    if (res) {
                        this.productService
                            .deletProductById(this.id)
                            .subscribe(() => this.router.navigate(['products']));
                        this.snackBarService.openSnackBar(SnackBarsTexts.DELETE_PRODUCT);
                    }
                },
                error => {
                    this.snackBarService.openSnackBar(SnackBarsTexts.FAILED_TO_DELETE_PRODUCT);
                    console.warn(error);
                }
            );
    }

    addProductToCart(product: Product): void {
        this.cartService.addProductToCart(product);
        this.snackBarService.openSnackBarForAddingProductToCart();
    }

    editProduct(product: Product): void {
        this.dialogService
            .openDialogForEditProduct(product)
            .afterClosed()
            .subscribe(product => {
                if (product) {
                    this.product$ = this.productService.editProdut(product);
                }
            });
    }
}
