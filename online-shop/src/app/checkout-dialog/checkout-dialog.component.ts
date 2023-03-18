import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-checkout-dialog',
    templateUrl: './checkout-dialog.component.html',
    styleUrls: ['./checkout-dialog.component.scss']
})
export class CheckoutDialogComponent implements OnInit {
    checkoutForm!: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CheckoutDialogComponent>) {}

    ngOnInit(): void {
        this.checkoutForm = this.fb.group({
            created: '',
            city: '',
            country: '',
            street: '',
            county: ''
        });
    }
}
