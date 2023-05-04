import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/product';

@Component({
    selector: 'app-image-dialog',
    templateUrl: './image-dialog.component.html',
    styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {
    imageForm!: FormGroup;

    constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public product: Product) {}

    ngOnInit(): void {
        this.imageForm = this.fb.group({
            imgUrl: this.product.imgUrl ?? ''
        });
    }
}
