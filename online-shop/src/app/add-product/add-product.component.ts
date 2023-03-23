import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
export class AddProductComponent implements OnInit {
    addProductForm!: FormGroup;
    suppliers: Supplier[] = [];
    productCategories: ProductCategory[] = [];
    subscription = new Subscription();
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddProductComponent>,
        private categoryService: ProductCategoryService,
        private supplierService: SupplierService
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
        this.addProductForm = this.fb.group({
            id: '',
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            weight: new FormControl('', [Validators.required]),
            imgUrl: new FormControl('', [Validators.required]),
            supplier: new FormControl(this.suppliers, [Validators.required]),
            productCategory: new FormControl(this.suppliers, [Validators.required])
        });
    }
}
