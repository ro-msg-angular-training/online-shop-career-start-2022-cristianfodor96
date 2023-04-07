import { Injectable } from '@angular/core';
import { Favorites } from 'src/favorites';
import { LocalStorageKeys } from 'src/local-storage-keys';
import { Product } from 'src/product';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    favoriteList: Favorites[] = this.initializeFavorites();

    private initializeFavorites(): Favorites[] {
        const productsInLocalStorage = localStorage.getItem(LocalStorageKeys.FAVORITES);

        if (!productsInLocalStorage) {
            return [];
        } else {
            return JSON.parse(productsInLocalStorage);
        }
    }

    getFavoritesPopulated(): Favorites[] {
        return this.favoriteList;
    }

    addProductToFavorites(product: Product): void {
        const productsInFavorites = this.favoriteList.find(orderItem => orderItem.product.id === product.id);
        if (!productsInFavorites) {
            this.favoriteList.push({ product });
            localStorage.setItem(LocalStorageKeys.FAVORITES, JSON.stringify(this.favoriteList));
            return;
        }
    }

    clearFavorites(): void {
        localStorage.removeItem(LocalStorageKeys.FAVORITES);
        this.favoriteList = [];
    }

    deleteProductFromFavorites(product: Favorites): void {
        this.favoriteList = this.favoriteList.filter(item => item.product.id !== product.product.id);
        localStorage.setItem(LocalStorageKeys.FAVORITES, JSON.stringify(this.favoriteList));
    }
}
