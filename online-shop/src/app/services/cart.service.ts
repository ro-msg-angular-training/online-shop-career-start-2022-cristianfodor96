import { Injectable } from '@angular/core';
import { ShoppingCart } from 'src/shopping-cart';
import { Product } from 'src/product';
import { LocalStorageKeys } from 'src/local-storage-keys';
import { Order } from 'src/order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendURL } from 'src/utils';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor(private http: HttpClient) {}

    cartList: ShoppingCart[] = this.initializeCart();

    private initializeCart(): ShoppingCart[] {
        const productsInLocalStorage = localStorage.getItem(LocalStorageKeys.SHOPPING_CART_KEY);

        if (!productsInLocalStorage) {
            return [];
        } else {
            return JSON.parse(productsInLocalStorage);
        }
    }

    addProductToCart(product: Product): void {
        const productsInCart = this.cartList.find(orderItem => orderItem.product.id === product.id);

        if (!productsInCart) {
            this.cartList.push({ product, quantity: 1 });
            localStorage.setItem(LocalStorageKeys.SHOPPING_CART_KEY, JSON.stringify(this.cartList));
            return;
        }

        productsInCart.quantity++;
        localStorage.setItem(LocalStorageKeys.SHOPPING_CART_KEY, JSON.stringify(this.cartList));
    }

    getShoppingCartPopulated(): ShoppingCart[] {
        return this.cartList;
    }

    clearCart(): void {
        localStorage.removeItem(LocalStorageKeys.SHOPPING_CART_KEY);
        this.cartList = [];
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(backendURL + 'orders', order);
    }
}
