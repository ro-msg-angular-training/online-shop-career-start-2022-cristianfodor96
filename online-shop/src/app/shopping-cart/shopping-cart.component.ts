import { Component } from '@angular/core';
import {ProductService} from "../product.service";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  constructor(private productService: ProductService) {
  }
  populateCart = this.productService.getShoppingCartPopulated();
  clearCart() {
    this.productService.clearCart();
  }
}
