import { Destination } from './destination';
import { TransactionsType } from './transactions-type';
import { Account } from 'src/app/class/account';
export class Transaction {
    transaction_id: Number;
    created: Date;
    ammount: Number;
    description: string;
    transactions_type: TransactionsType;
    account: Account;
    destination: Destination;
}
