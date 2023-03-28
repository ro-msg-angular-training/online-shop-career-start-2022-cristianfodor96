import { Component } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { CartService } from '../services/cart.service';
import { Order } from 'src/order';
import { SnackBarService } from '../services/snack-bar.service';
import { SnackBarsTexts } from 'src/snack-bars-texts';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
    constructor(
        private cartService: CartService,
        private dialogService: DialogService,
        private snackBarService: SnackBarService
    ) {}

    populateCart = this.cartService.getShoppingCartPopulated();

    createOrder(): void {
        this.dialogService
            .openDialogForCheckout()
            .afterClosed()
            .subscribe(data => {
                if (data) {
                    const orderDetails = this.populateCart.map(e => {
                        return { productId: e.product.id, quantity: e.quantity };
                    });
                    const order: Order = { ...data, orderDetails };
                    this.cartService.createOrder(order).subscribe(
                        () => {
                            this.snackBarService.openSnackBar(SnackBarsTexts.ORDER_CONFIRMED);
                            this.cartService.clearCart();
                            this.populateCart = this.cartService.getShoppingCartPopulated();
                        },
                        error => {
                            this.snackBarService.openSnackBar(SnackBarsTexts.FAILED_ORDER);
                            console.warn(error);
                        }
                    );
                }
            });
    }

    clearCart(): void {
        this.snackBarService.openSnackBar(SnackBarsTexts.CLEAR_CART);
        this.cartService.clearCart();
        this.populateCart = this.cartService.getShoppingCartPopulated();
    }

    displayedColumns: string[] = ['name', 'price', 'supplier', 'quantity'];
    dataSource = this.populateCart;
}
