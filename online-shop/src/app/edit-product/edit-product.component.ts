import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/product';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from 'src/supplier';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from 'src/product-category';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    productForm!: FormGroup;
    suppliers: Supplier[] = [];
    productCategories: ProductCategory[] = [];
    subscription = new Subscription();
    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public product: Product,
        private supplierService: SupplierService,
        private categoryService: ProductCategoryService
    ) {}

    ngOnInit(): void {
        this.subscription.add(
            this.categoryService.getAllProductCategories().subscribe((data: ProductCategory[]) => {
                this.productCategories = data;
            })
        );

        this.subscription.add(
            this.supplierService.getAllSuppliers().subscribe((data: Supplier[]) => {
                this.suppliers = data;
            })
        );
        this.productForm = this.fb.group({
            id: this.product.id ?? '',
            name: this.product.name ?? '',
            description: this.product.description ?? '',
            price: this.product.price ?? '',
            weight: this.product.weight ?? '',
            imgUrl: this.product.imgUrl ?? '',
            supplier: this.product.supplier ?? '',
            productCategory: this.product.productCategory ?? ''
        });
    }
}
