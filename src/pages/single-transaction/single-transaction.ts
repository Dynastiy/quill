import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TransactionService } from '../../services/transaction-service';

/*
  Generated class for the NewSingleTransaction page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-single-transaction',
  templateUrl: 'single-transaction.html'
})
export class SingleTransactionPage {

  public errors: any = [];

  public transactionType: string;

  public amount: number;
  public note: string;
  public startDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionService) {
    this.transactionType = this.navParams.data;
  }

  cancelTransactionPressed() {
    this.navCtrl.popToRoot();
  }

  submitTransaction() {

      this.transactionService.addSingleTransaction(this.amount, this.note, this.startDate, this.transactionType).subscribe(
          data => {
              this.navCtrl.popToRoot();
          },
          error => {
              console.log(error);
              this.errors = [''];
              this.errors.push(error)
          });
  }

}
