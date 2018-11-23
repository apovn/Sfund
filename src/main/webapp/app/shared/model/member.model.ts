import { Moment } from 'moment';
import { IPayment } from 'app/shared/model//payment.model';

export interface IMember {
    id?: number;
    created?: Moment;
    name?: string;
    description?: any;
    birthday?: Moment;
    phone?: number;
    currentAmount?: number;
    totalAmount?: number;
    info?: any;
    payments?: IPayment[];
}

export class Member implements IMember {
    constructor(
        public id?: number,
        public created?: Moment,
        public name?: string,
        public description?: any,
        public birthday?: Moment,
        public phone?: number,
        public currentAmount?: number,
        public totalAmount?: number,
        public info?: any,
        public payments?: IPayment[]
    ) {}
}
