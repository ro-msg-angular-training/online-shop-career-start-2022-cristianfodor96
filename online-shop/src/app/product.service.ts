import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {find, Observable} from "rxjs";
import {Product} from "../product";
import {ShoppingCart} from "../shopping-cart";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  cartList: ShoppingCart[] = []
  API = 'http://localhost:8080/';

  getProducts() {
    return this.http.get<Product[]>(this.API + 'products');
  }

  getProductById(id:number): Observable<Product> {
    return this.http.get<Product>(this.API + 'products/' + id);
  }

  deletProductById(id:number) {
    return this.http.delete(this.API + 'products/' + id);
  }
  addProductToCart(product: Product) {
    const productExistInCart = this.cartList
      .find(orderItem => orderItem.product.id === product.id)
    if (!productExistInCart) {
      this.cartList.push({product, quantity: 1});
      return;
    }
    productExistInCart.quantity += 1;
  }
  getShoppingCartPopulated() {
    return this.cartList;
  }
  clearCart() {
    this.cartList = []
  }
}
