import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/supplier';
import { ProductCategory } from 'src/product-category';
import { Subscription } from 'rxjs';
import { ProductCategoryService } from '../services/product-category.service';
import { SupplierService } from '../services/supplier.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
    addProductForm!: FormGroup;
    suppliers: Supplier[] = [];
    productCategories: ProductCategory[] = [];
    subscription = new Subscription();
    constructor(
        private formBuilder: FormBuilder,
        private productCategoryService: ProductCategoryService,
        private supplierService: SupplierService
    ) {}

    ngOnInit(): void {
        this.subscription.add(
            this.productCategoryService.getAllProductCategories().subscribe((productCategories: ProductCategory[]) => {
                this.productCategories = productCategories;
            })
        );
        this.subscription.add(
            this.supplierService.getAllSuppliers().subscribe((suppliers: Supplier[]) => {
                this.suppliers = suppliers;
            })
        );
        this.addProductForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            weight: new FormControl('', [Validators.required]),
            imgUrl: new FormControl('', [Validators.required]),
            supplier: new FormControl(this.suppliers, [Validators.required]),
            productCategory: new FormControl(this.productCategories, [Validators.required])
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
