import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TransactionService } from '../../services/transaction-service';


@Component({
  selector: 'page-single-transaction',
  templateUrl: 'all-transactions.html'
})
export class AllTransactionsPage {


  public viewTransactionsTitle: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactionService: TransactionService) {
    this.viewTransactionsTitle = this.navParams.data;
  }

  cancelTransactionPressed() {
    this.navCtrl.popToRoot();
  }

  clearTransactions() {
    this.transactionService.clearTransactions();
  }

}
