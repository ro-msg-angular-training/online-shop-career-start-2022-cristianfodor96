import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarsTexts } from 'src/snack-bars-texts';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private _snackBar: MatSnackBar, private router: Router) {}

    openSnackBar(message: string): void {
        this._snackBar.open(message, 'Close', {
            duration: 2000
        });
    }

    openSnackBarForAddingProductToCart(): void {
        this._snackBar
            .open(SnackBarsTexts.ADD_TO_CART, 'View Cart', {
                duration: 3000
            })
            .onAction()
            .subscribe(() => this.router.navigate(['cart']));
    }

    openSnackBarForAddingProductToFavorites(): void {
        this._snackBar
            .open(SnackBarsTexts.ADD_TO_FAVORITES, 'Go to favorites', {
                duration: 3000
            })
            .onAction()
            .subscribe(() => this.router.navigate(['favorites']));
    }
}
