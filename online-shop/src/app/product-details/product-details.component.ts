import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { DialogService } from '../dialog.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role } from 'src/user-details';

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
        private authService: AuthService
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
                }
            });
    }

    addProductToCart(): void {
        this.cartService.addProductToCart(this.product);
        alert('Your product has been added to the cart!');
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
