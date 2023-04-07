import { Component } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { SnackBarService } from '../services/snack-bar.service';
import { SnackBarsTexts } from 'src/snack-bars-texts';
import { Router } from '@angular/router';
import { Favorites } from 'src/favorites';
import { Product } from 'src/product';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-favorite-list',
    templateUrl: './favorite-list.component.html',
    styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent {
    constructor(
        private favoritesService: FavoriteService,
        private snackBarService: SnackBarService,
        private router: Router,
        private cartService: CartService
    ) {}

    populateFavorites = this.favoritesService.getFavoritesPopulated();

    clearFavorites(): void {
        this.snackBarService.openSnackBar(SnackBarsTexts.CLEAR_FAVORITES);
        this.favoritesService.clearFavorites();
        this.populateFavorites = this.favoritesService.getFavoritesPopulated();
    }

    navigateToProducts(): void {
        this.router.navigate(['products']);
    }

    deleteProductFromFavorites(product: Favorites): void {
        this.favoritesService.deleteProductFromFavorites(product);
        this.populateFavorites = this.favoritesService.getFavoritesPopulated();
    }

    navigateToShoppingCart(): void {
        this.router.navigate(['cart']);
    }

    addProductToCart(product: Product): void {
        this.cartService.addProductToCart(product);
        this.snackBarService.openSnackBarForAddingProductToCart();
    }

    displayedColumns: string[] = ['name', 'price', 'supplier', 'image', 'delete'];
    dataSource = this.populateFavorites;
}
