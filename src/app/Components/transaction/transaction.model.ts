import { Event } from '../event/event.model';
import { Generic } from './../common/generic.model';
import { User } from './../user/user.model';
export interface Transaction {
    id: number;
    fromUser: User;
    toUser: User;
    toEvent: Event;
    transactionType: Generic,
    date: Date;
    value: number;
    balance: number;
}
