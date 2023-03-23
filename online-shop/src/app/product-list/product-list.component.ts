import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../services/auth.service';
import { Role } from 'src/user-details';

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
        private authService: AuthService
    ) {}

    products: Product[] = [];
    subscription = new Subscription();
    roles: Role[] = [Role.admin];

    ngOnInit(): void {
        this.subscription.add(
            this.productService.getAllProducts().subscribe((data: Product[]) => {
                this.products = data;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    navigateToProductById(id: number): void {
        this.router.navigateByUrl(`product/${id}`).then();
    }

    navigateToShoppingCart(): void {
        this.router.navigate(['cart']);
    }

    displayedColumns: string[] = [
        'name',
        'description',
        'price',
        'weight',
        'image',
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
        return this.authService.isAuthorised(this.roles);
    }

    logOut(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
