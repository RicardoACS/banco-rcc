import { Bank } from './bank';
export class Destination {
    destination_id: number;
    rut: string;
    name: string;
    email: string;
    created: Date;
    account_number: string;
    account_id: string;
    bank: Bank;
}
