
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmPasswordValidator } from '../../validators/passwords';
import { HomePage } from '../home/home'
import { AuthService } from '../../services/authentication-service';


@Component({
    selector: 'page-user-register',
    templateUrl: 'user-register.html'
})
export class UserRegisterPage {

    private userEmail: string;
    private userPassword: string;
    private userConfirmPassword: string;

    public errors: any = [];

    registerForm: FormGroup;
    submitAttempt: boolean = false; //Used to track whether the submit button has been clicked for displaying errors and styling.

    constructor(public authService: AuthService, public navCtrl: NavController,
        public navParams: NavParams, public menuCtrl: MenuController, public formBuilder: FormBuilder) {
        this.menuCtrl.enable(false);

        this.registerForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])], //This Validation regex covers 99% of email addresses
            password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&.*-]).{6,}$/)])], //This validation should cover the password requirements of the server (1 Upper, 1 lower, one numb, 1 special, at least 6 long) this might make things too coupled.
            confirmPassword: ['', ConfirmPasswordValidator.checkConfirmPassword]
        });

        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    registerUser() {
        this.submitAttempt = true;

        if (this.registerForm.valid) {
            this.authService.registerUser(this.userEmail, this.userPassword, this.userConfirmPassword).subscribe(
                data => {
                    this.authService.getToken(this.userEmail, this.userPassword).subscribe(
                        data => {
                            this.authService.saveUserToStorage(data).then((promise) => { this.navCtrl.setRoot(HomePage); });
                        },
                        error => {
                            console.log(error);
                            this.errors.push(error)
                        });
                },
                error => {
                    this.errors = [''];
                    if (error != 'Server error') {
                        for (var errorProp in error) {
                            if (error.hasOwnProperty(errorProp)) {
                                var errorArray = error[errorProp];
                                if (errorArray.length) {
                                    for (var i = 0; i < errorArray.length; ++i) {
                                        this.errors.push(errorArray[i]);
                                        console.log(errorArray[i]);
                                    }
                                }
                            }
                        }
                    }
                    if (error == 'Server error')
                        this.errors.push(error);
                });
        }
    }

}