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
    id = 0;
    product!: Product;
    roles: Role[] = [Role.admin];
    product$!: Observable<Product>;
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
        this.productService.getProductById(this.id).subscribe(product => {
            this.product = product;
        });
    }

    // ngOnInit(): void {
    //     this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    //     this.product$ = this.productService.getProductById(this.id);
    // }

    deleteProduct(): void {
        this.dialogService
            .openDialogForConfirmDelete()
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    this.productService.deletProductById(this.id).subscribe(() => this.router.navigate(['products']));
                    this.snackBarService.openSnackBar(SnackBarsTexts.deleteProduct);
                }
            });
    }

    addProductToCart(): void {
        this.cartService.addProductToCart(this.product);
        this.snackBarService.openSnackBar(SnackBarsTexts.addToCart);
    }

    editProduct(): void {
        this.dialogService
            .openDialogForProduct(this.product)
            .afterClosed()
            .subscribe(product => {
                if (product) {
                    this.productService.editProdut(product).subscribe(newProduct => {
                        this.product = newProduct;
                    });
                }
            });
    }

    canEdit(): boolean {
        return this.authService.isAuthorised(this.roles);
    }
}
