import { Component } from '@angular/core';
import {Product, products} from "../../product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  products: Product[] = products;
}
