import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signUpForm!: FormGroup;

    ngOnInit(): void {
        this.signUpForm = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.minLength(8), Validators.required]),
            emailAddress: new FormControl('', [Validators.email, Validators.required])
        });
    }
}
