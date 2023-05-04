import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerrorComponent } from './customerror/customerror.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
    declarations: [
        AppComponent,
        ProductDetailsComponent,
        ProductListComponent,
        ShoppingCartComponent,
        CustomerrorComponent,
        CheckoutDialogComponent,
        LoginPageComponent,
        EditProductComponent,
        AddProductComponent,
        ConfirmDialogComponent,
        SignUpComponent,
        FavoriteListComponent,
        ImageDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatMenuModule,
        MatBadgeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
