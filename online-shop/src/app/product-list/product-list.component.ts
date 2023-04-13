import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../services/auth.service';
import { Role } from 'src/user-details';
import { SnackBarService } from '../services/snack-bar.service';
import { SnackBarsTexts } from 'src/snack-bars-texts';
import { CartService } from '../services/cart.service';
import { FavoriteService } from '../services/favorites.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private productService: ProductService,
        private dialogService: DialogService,
        private authService: AuthService,
        private snackBarService: SnackBarService,
        private cartService: CartService,
        private favoritesService: FavoriteService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}
    @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
    products: Product[] = [];
    subscription = new Subscription();
    admin: Role[] = [Role.ADMIN];
    canEdit!: boolean;
    populateFavorites = this.favoritesService.getFavoritesPopulated();
    totalProductsQuantity!: number;

    ngOnInit(): void {
        this.subscription.add(
            this.productService.getAllProducts().subscribe((products: Product[]) => {
                this.products = products;
                this.changeDetectorRef.detectChanges();
            })
        );
        this.canEdit = this.authService.isAuthorised(this.admin);
        this.totalProductsQuantity = this.cartService.getTotalProductsQuantity();
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

    logOut(): void {
        this.snackBarService.openSnackBar(SnackBarsTexts.LOGGED_OUT);
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    addProductToCart(product: Product): void {
        this.cartService.addProductToCart(product);
        this.snackBarService.openSnackBarForAddingProductToCart();
        this.totalProductsQuantity = this.cartService.getTotalProductsQuantity();
    }

    addAndDeleteProductToFavorites(product: Product): void {
        this.favoritesService.addAndDeleteProductToFavorites(product);
    }

    navigateToFavorites(): void {
        this.router.navigate(['favorites']);
    }

    openMenuForFavorites(): void {
        this.trigger.openMenu();
    }

    clearFavorites(): void {
        this.snackBarService.openSnackBar(SnackBarsTexts.CLEAR_FAVORITES);
        this.favoritesService.clearFavorites();
        this.populateFavorites = this.favoritesService.getFavoritesPopulated();
    }

    checkIfProductIsInFavoriteListOrNot(productId: number): boolean {
        console.log('adasd');
        return this.favoritesService.checkIfProductIsInFavoriteListOrNot(productId);
    }
}
