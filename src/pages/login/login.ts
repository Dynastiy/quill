import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/authentication-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRegisterPage } from '../user-register/user-register';
import { HomePage } from '../home/home';
 
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: string;
  public password: string;

  public errors: any = [];

  loginForm: FormGroup;

  submitAttempt: boolean = false; //used to track whether a submit has been made for validation error styling

  constructor(public authService: AuthService, public navCtrl: NavController,
      public menuCtrl: MenuController, public formBuilder: FormBuilder) {

      this.loginForm = formBuilder.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])], //This Validator pattern regex should cover 99% of valid email addresses.
          password: ['', Validators.required]
      });
  }

  ionViewDidEnter() {
      this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
  }


  login(username: string, password: string) {
      this.submitAttempt = true; //Indicate that we attempted to submit the form to apply error styles.

      if (this.loginForm.valid) { //If forms are valid, request the token from server
          this.authService.getToken(this.email, this.password).subscribe(
              data => {
                  this.authService.saveUserToStorage(data).then((promise) => { this.navCtrl.setRoot(HomePage);});
              },
              error => {
                  console.log(error);
                  this.errors = [''];
                  this.errors.push(error)
              });
      }
  }

  navigateToRegisterPage() {
      this.navCtrl.push(UserRegisterPage);
  }



}


