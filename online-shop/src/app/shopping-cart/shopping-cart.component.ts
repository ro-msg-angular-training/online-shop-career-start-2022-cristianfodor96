import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { CartService } from '../cart.service';
import { Order } from 'src/order';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
    constructor(private cartService: CartService, private dialogService: DialogService) {}

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
                    alert('Your order has been sent');
                    this.cartService.clearCart();
                });
            });
    }

    clearCart(): void {
        this.cartService.clearCart();
    }

    displayedColumns: string[] = ['name', 'price', 'supplier', 'quantity'];
    dataSource = this.populateCart;
}
