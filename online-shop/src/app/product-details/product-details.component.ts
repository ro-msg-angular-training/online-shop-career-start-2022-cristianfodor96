import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../product';
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id = 0;
  product!: Product;
  constructor(private route: ActivatedRoute, private productService: ProductService) {}



  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.productService.getProductById(this.id).subscribe(data => {
      this.product = data;
    })
  }

deleteProduct() {
    this.productService.deletProductById(this.id).subscribe();
    alert("Product deleted!")
    }

    addProductToCart() {
    this.productService.addProductToCart(this.product);
    alert("Your product has been added to the cart!")
    }
}
