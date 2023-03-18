import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    loginForm!: FormGroup;
    submitted = false;
    loading = false;

    constructor(private fB: FormBuilder, private authService: AuthService, private router: Router) {}

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
                    this.router.navigate(['products']);
                },
                error => {
                    alert('Username or password is wrong!');
                    console.warn(error);
                }
            );
    }
}
