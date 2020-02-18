import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SingleTransactionPage } from '../pages/single-transaction/single-transaction';
import { RecurringTransactionPage } from '../pages/recurring-transaction/recurring-transaction';
import { AllTransactionsPage } from '../pages/all-transactions/all-transactions';
import { TransactionService } from '../services/transaction-service';
import { AuthService } from '../services/authentication-service';
import { LoginPage } from '../pages/login/login';
import { UserRegisterPage } from '../pages/user-register/user-register';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SingleTransactionPage,
    RecurringTransactionPage,
    AllTransactionsPage,
    LoginPage,
    UserRegisterPage
  ],
  imports: [
      IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SingleTransactionPage,
    RecurringTransactionPage,
    AllTransactionsPage,
    LoginPage,
    UserRegisterPage
  ],
  providers: [
    TransactionService,
    AuthService
  ]
})
export class AppModule {}
