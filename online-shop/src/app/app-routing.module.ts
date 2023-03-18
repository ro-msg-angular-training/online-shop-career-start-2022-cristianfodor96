import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CustomerrorComponent } from './customerror/customerror.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: '**', component: CustomerrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
