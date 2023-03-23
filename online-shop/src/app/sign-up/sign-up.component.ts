import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UniqueUsernameValidatorService } from '../validators/unique-username-validator.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    constructor(private uniqueUsernameValidator: UniqueUsernameValidatorService) {}
    signUpForm!: FormGroup;

    ngOnInit(): void {
        this.signUpForm = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            username: new FormControl(null, {
                validators: [Validators.required],
                asyncValidators: [this.uniqueUsernameValidator.usernameValidator()],
                updateOn: 'blur'
            }),
            password: new FormControl('', [Validators.minLength(8), Validators.required]),
            emailAddress: new FormControl('', [Validators.email, Validators.required])
        });
    }
}
