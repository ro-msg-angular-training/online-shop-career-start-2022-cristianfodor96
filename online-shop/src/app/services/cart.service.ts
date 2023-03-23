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
        const productsExistInLocalStorage = localStorage.getItem(LocalStorageKeys.shoppingCartKey);

        if (!productsExistInLocalStorage) {
            return [];
        } else {
            return JSON.parse(productsExistInLocalStorage);
        }
    }

    addProductToCart(product: Product): void {
        const productExistInCart = this.cartList.find(orderItem => orderItem.product.id === product.id);

        if (!productExistInCart) {
            this.cartList.push({ product, quantity: 1 });
            localStorage.setItem(LocalStorageKeys.shoppingCartKey, JSON.stringify(this.cartList));
            return;
        }

        productExistInCart.quantity += 1;
        localStorage.setItem(LocalStorageKeys.shoppingCartKey, JSON.stringify(this.cartList));
    }

    getShoppingCartPopulated(): ShoppingCart[] {
        return this.cartList;
    }

    clearCart(): void {
        localStorage.clear();
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(backendURL + 'orders', order);
    }
}
