import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-recurring-transaction',
  templateUrl: 'recurring-transaction.html'
})
export class RecurringTransactionPage {
  
  public transactionType: string;
  public startDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.transactionType = this.navParams.data;
  }

  cancelTransactionPressed() {
    this.navCtrl.popToRoot();
  }

}
