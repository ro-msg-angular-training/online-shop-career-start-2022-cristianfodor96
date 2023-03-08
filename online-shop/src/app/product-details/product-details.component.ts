import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../product";
import {products} from "../../product";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id = 0;
  product!: Product
constructor(
  private route: ActivatedRoute,
) {}
  ngOnInit(): void {
   this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
   this.product = products.find(product => product.id === this.id)!;
  }
}
