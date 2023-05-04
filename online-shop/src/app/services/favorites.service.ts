import { Injectable } from '@angular/core';
import { Favorites } from 'src/favorites';
import { LocalStorageKeys } from 'src/local-storage-keys';
import { Product } from 'src/product';
import { SnackBarService } from './snack-bar.service';
import { SnackBarsTexts } from 'src/snack-bars-texts';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    constructor(private snackBarService: SnackBarService) {}
    favoritesList: Favorites[] = this.initializeFavorites();
    buttonClicked!: boolean;

    private initializeFavorites(): Favorites[] {
        const productsInLocalStorage = localStorage.getItem(LocalStorageKeys.FAVORITES);

        if (!productsInLocalStorage) {
            return [];
        } else {
            return JSON.parse(productsInLocalStorage);
        }
    }

    getFavoritesPopulated(): Favorites[] {
        return this.favoritesList;
    }

    addAndDeleteProductToFavorites(product: Product): void {
        const productsInFavorites = this.favoritesList.find(
            favoriteProduct => favoriteProduct.product.id === product.id
        );
        if (!productsInFavorites) {
            this.snackBarService.openSnackBarForAddingProductToFavorites();
            this.favoritesList.push({ product });
            localStorage.setItem(LocalStorageKeys.FAVORITES, JSON.stringify(this.favoritesList));
            this.buttonClicked = false;
        } else {
            const index = this.favoritesList.findIndex(favoriteProduct => favoriteProduct.product.id === product.id);
            this.snackBarService.openSnackBar(SnackBarsTexts.PRODUCT_DELETED_FROM_FAVORITES);
            this.favoritesList.splice(index, 1);
            localStorage.setItem(LocalStorageKeys.FAVORITES, JSON.stringify(this.favoritesList));
            this.buttonClicked = false;
        }
    }

    clearFavorites(): void {
        localStorage.removeItem(LocalStorageKeys.FAVORITES);
        this.favoritesList = [];
    }

    deleteProductFromFavorites(product: Favorites): void {
        this.favoritesList = this.favoritesList.filter(
            favoriteProduct => favoriteProduct.product.id !== product.product.id
        );
        localStorage.setItem(LocalStorageKeys.FAVORITES, JSON.stringify(this.favoritesList));
    }

    checkIfProductIsInFavoriteListOrNot(productId: number): boolean {
        const productsInFavorites = this.favoritesList.find(
            favoriteProduct => favoriteProduct.product.id === productId
        );
        return productsInFavorites ? true : false;
    }
}
