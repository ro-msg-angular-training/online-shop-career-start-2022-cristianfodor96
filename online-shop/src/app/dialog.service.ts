import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/product';
import { AddProductComponent } from './add-product/add-product.component';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private dialogRef: MatDialog) {}

    openDialogForCheckout(): MatDialogRef<CheckoutDialogComponent> {
        return this.dialogRef.open(CheckoutDialogComponent);
    }

    openDialogForProduct(product?: Product): MatDialogRef<EditProductComponent> {
        return this.dialogRef.open(EditProductComponent, {
            data: product
        });
    }

    openDialogForAddProduct(): MatDialogRef<AddProductComponent> {
        return this.dialogRef.open(AddProductComponent);
    }

    openDialogForConfirmDelete(): MatDialogRef<ConfirmDialogComponent> {
        return this.dialogRef.open(ConfirmDialogComponent, {
            disableClose: true
        });
    }
}
