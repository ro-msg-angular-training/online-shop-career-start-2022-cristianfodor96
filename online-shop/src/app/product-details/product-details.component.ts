import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { DialogService } from '../dialog.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role } from 'src/user-details';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    id = 0;
    product!: Product;
    roles: Role[] = [Role.admin];
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
        private dialogService: DialogService,
        private router: Router,
        private authService: AuthService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
        this.productService.getProductById(this.id).subscribe(product => {
            this.product = product;
        });
    }

    deleteProduct(): void {
        this.dialogService
            .openDialogForConfirmDelete()
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    this.productService.deletProductById(this.id).subscribe(() => this.router.navigate(['products']));
                    this.openSnackBar('Product deleted!');
                }
            });
    }

    addProductToCart(): void {
        this.cartService.addProductToCart(this.product);
        this.openSnackBar('Product added to cart!');
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

    openSnackBar(message: string): void {
        this._snackBar.open(message, 'Close', {
            duration: 3000
        });
    }
}
