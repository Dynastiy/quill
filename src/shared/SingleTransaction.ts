export class SingleTransaction {

    public transactionAmount: number;
    public transactionNote: string;
    public transactionDate: string;
    public transactionType: string 

    constructor(amount: number, note: string, date: string, type: string) {
        this.transactionAmount = amount;
        this.transactionNote = note;
        this.transactionDate = date;
        this.transactionType = type;
    }

}