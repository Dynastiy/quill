import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { SingleTransactionPage } from '../single-transaction/single-transaction';
import { RecurringTransactionPage } from '../recurring-transaction/recurring-transaction';
import { AllTransactionsPage } from '../all-transactions/all-transactions';

import { AuthService } from '../../services/authentication-service';

@Component({
  selector: 'page-homepage',
  templateUrl: 'home.html'
})
export class HomePage {
    remainingBudgetDollars: number;
    nextPayDate: string;
    currentUserName: string;
  
    constructor(public navCtrl: NavController, public menuCtrl: MenuController, public authService: AuthService) {
        this.remainingBudgetDollars = 0.00;
    }

    ionViewDidEnter() {
        this.menuCtrl.enable(true);
        this.currentUserName = this.authService.getUserData().currentUserName;
    }


    transactionType = Object.freeze({
      Withdrawal: 'Withdrawal',
      Deposit: 'Deposit'
    });
    // withdrawal: string = 'Make A Withdrawal';
    // deposit: string = 'Make A Deposit';

    viewTransactionsTitle: string = 'All Transactions';

    pressedTransaction(recurring: boolean, transactionType: string) {
      if(!recurring) {
        this.navCtrl.push(SingleTransactionPage, transactionType);
      } else {
        this.navCtrl.push(RecurringTransactionPage, transactionType);
      }

    }

    pressedViewTransactions() {
        this.navCtrl.push(AllTransactionsPage, this.viewTransactionsTitle);
    }

    hasNextPayDate() {
      //will return false if nextPayDate is undefined, null, or empty string ("")
      return this.nextPayDate ? true : false;
    }

    
}
