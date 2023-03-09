import {Component, OnInit} from '@angular/core';
import { Product} from '../../product';
import {Router} from "@angular/router";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit{
constructor(private router:Router, private productService: ProductService) { }

  products: Product[] = [];

ngOnInit() {
  this.productService.getProducts().subscribe((data: Product[]) => {
    this.products = data;
    console.log(data)
  })
}


  navigateByProductId(id: number) {
    this.router.navigateByUrl(`product/${id}`).then();
}

shoppingCart() {
  this.router.navigate(['cart']);
}

}
