import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { CartService } from '../cart.service';
import { Order } from 'src/order';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
    constructor(
        private cartService: CartService,
        private dialogService: DialogService,
        private _snackBar: MatSnackBar
    ) {}

    populateCart = this.cartService.getShoppingCartPopulated();

    createOrder(): void {
        this.dialogService
            .openDialogForCheckout()
            .afterClosed()
            .subscribe(data => {
                const orderDetails = this.populateCart.map(e => {
                    return { productId: e.product.id, quantity: e.quantity };
                });
                const order: Order = { ...data, orderDetails };
                this.cartService.createOrder(order).subscribe(newOrder => {
                    data = newOrder;
                    this.openSnackBar('Order sent!');
                    this.cartService.clearCart();
                });
            });
    }

    clearCart(): void {
        this.cartService.clearCart();
        this.openSnackBar('Cart cleared!');
    }

    displayedColumns: string[] = ['name', 'price', 'supplier', 'quantity'];
    dataSource = this.populateCart;

    openSnackBar(message: string): void {
        this._snackBar.open(message, 'Close', {
            duration: 3000
        });
    }
}
