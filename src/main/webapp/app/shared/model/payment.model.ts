import { Moment } from 'moment';
import { IReason } from 'app/shared/model//reason.model';

export const enum PayStatusEnum {
    PAID = 'PAID',
    UNPAID = 'UNPAID'
}

export interface IPayment {
    id?: number;
    created?: Moment;
    amount?: number;
    status?: PayStatusEnum;
    payDate?: Moment;
    info?: any;
    reasons?: IReason[];
    memberId?: number;
}

export class Payment implements IPayment {
    constructor(
        public id?: number,
        public created?: Moment,
        public amount?: number,
        public status?: PayStatusEnum,
        public payDate?: Moment,
        public info?: any,
        public reasons?: IReason[],
        public memberId?: number
    ) {}
}
