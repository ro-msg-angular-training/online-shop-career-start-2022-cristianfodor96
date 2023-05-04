import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-checkout-dialog',
    templateUrl: './checkout-dialog.component.html',
    styleUrls: ['./checkout-dialog.component.scss']
})
export class CheckoutDialogComponent implements OnInit {
    checkoutForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.checkoutForm = this.fb.group({
            city: '',
            country: '',
            street: '',
            county: ''
        });
    }
}
