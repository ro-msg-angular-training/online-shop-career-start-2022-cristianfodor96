import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { CustomerService } from '../services/customer.service';
import { SnackBarService } from '../services/snack-bar.service';
import { SnackBarsTexts } from 'src/snack-bars-texts';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    loginForm!: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private customerService: CustomerService,
        private authService: AuthService,
        private router: Router,
        private dialogService: DialogService,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService
            .login(this.loginForm.value.username, this.loginForm.value.password)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigate(['products']);
                },
                error => {
                    alert('Username or password is wrong!');
                    console.warn(error);
                }
            );
    }

    signUp(): void {
        this.dialogService
            .openDialogForSignUp()
            .afterClosed()
            .subscribe(customer => {
                if (customer) {
                    this.customerService.addNewCustomer(customer).subscribe(newCustomer => {
                        customer = newCustomer;
                        this.snackBarService.openSnackBar(SnackBarsTexts.CREATE_ACCOUNT);
                        this.router.navigate(['login']);
                    });
                }
            });
    }
}
